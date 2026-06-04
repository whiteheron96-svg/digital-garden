import { createClient } from "@supabase/supabase-js"

type SupabaseComment = {
  id: string | number
  page_slug: string
  nickname: string
  content: string
  created_at: string
}

type CommentsElement = Omit<HTMLElement, "dataset"> & {
  dataset: DOMStringMap & {
    supabaseUrl?: string
    supabaseAnonKey?: string
  }
}

const clearChildren = (element: Element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

const setStatus = (status: HTMLElement, message: string, isError = false) => {
  status.textContent = message
  status.dataset.state = isError ? "error" : "default"
}

const formatDate = (value: string) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date)
}

const createCommentItem = (comment: SupabaseComment) => {
  const item = document.createElement("li")
  item.className = "comment"

  const header = document.createElement("div")
  header.className = "comment-header"

  const nickname = document.createElement("strong")
  nickname.textContent = comment.nickname

  const time = document.createElement("time")
  time.dateTime = comment.created_at
  time.textContent = formatDate(comment.created_at)

  const content = document.createElement("p")
  content.textContent = comment.content

  header.append(nickname, time)
  item.append(header, content)

  return item
}

const initComments = () => {
  const container = document.querySelector(".comments") as CommentsElement | null
  if (!container) {
    return
  }

  const supabaseUrl = container.dataset.supabaseUrl
  const supabaseAnonKey = container.dataset.supabaseAnonKey
  const status = container.querySelector(".comments-status") as HTMLElement | null
  const list = container.querySelector(".comments-list") as HTMLOListElement | null
  const form = container.querySelector("form.comments-form") as HTMLFormElement | null
  const nicknameInput = container.querySelector(".comments-nickname") as HTMLInputElement | null
  const contentInput = container.querySelector(".comments-content") as HTMLTextAreaElement | null

  if (!status || !list || !form || !nicknameInput || !contentInput) {
    return
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase comments configuration", {
      hasSupabaseUrl: Boolean(supabaseUrl),
      hasSupabaseAnonKey: Boolean(supabaseAnonKey),
    })
    setStatus(status, "Comments are not configured.", true)
    form.hidden = true
    return
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  const loadComments = async () => {
    const pageSlug = window.location.pathname
    setStatus(status, "Loading comments...")

    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("page_slug", pageSlug)
      .order("created_at")

    if (error) {
      console.error(error)
      setStatus(status, "Could not load comments.", true)
      return
    }

    try {
      const comments = (data ?? []) as SupabaseComment[]
      clearChildren(list)

      for (const comment of comments) {
        list.appendChild(createCommentItem(comment))
      }

      setStatus(
        status,
        comments.length === 0
          ? "No comments yet."
          : `${comments.length} comment${comments.length === 1 ? "" : "s"}`,
      )
    } catch (error) {
      console.error(error)
      setStatus(status, "Could not load comments.", true)
    }
  }

  const submitComment = async (event: SubmitEvent) => {
    event.preventDefault()
    event.stopPropagation()
    console.log("comment submit triggered")

    const nickname = nicknameInput.value.trim()
    const content = contentInput.value.trim()
    if (!nickname || !content) {
      setStatus(status, "Nickname and comment are required.", true)
      return
    }

    const submitButton = form.querySelector("button[type='submit']") as HTMLButtonElement | null
    submitButton?.setAttribute("disabled", "true")
    setStatus(status, "Posting comment...")

    try {
      const { error } = await supabase.schema("public").from("comments").insert({
        page_slug: window.location.pathname,
        nickname,
        content,
      })

      if (error) {
        console.error(error)
        setStatus(status, "Could not post comment.", true)
        return
      }

      contentInput.value = ""
      await loadComments()
    } catch (error) {
      console.error(error)
      setStatus(status, "Could not post comment.", true)
    } finally {
      submitButton?.removeAttribute("disabled")
    }
  }

  if (form.dataset.commentsBound !== "true") {
    form.dataset.commentsBound = "true"
    form.addEventListener("submit", submitComment)
    window.addCleanup?.(() => form.removeEventListener("submit", submitComment))
  }

  loadComments()
}

initComments()
document.addEventListener("nav", initComments)
