import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import style from "./styles/comments.scss"
// @ts-ignore
import script from "./scripts/comments.inline"

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL ?? ""
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY ?? ""

const Comments: QuartzComponent = ({ displayClass, fileData }: QuartzComponentProps) => {
  const slug = fileData.slug ?? ""
  const isPost = slug !== "index" && !slug.startsWith("tags/") && !slug.endsWith("/index")
  const disableComment: boolean =
    typeof fileData.frontmatter?.comments !== "undefined" &&
    (!fileData.frontmatter?.comments || fileData.frontmatter?.comments === "false")

  if (!isPost || disableComment) {
    return <></>
  }

  return (
    <section
      class={classNames(displayClass, "comments")}
      data-supabase-url={supabaseUrl}
      data-supabase-anon-key={supabaseAnonKey}
    >
      <h2>Comments</h2>
      <div class="comments-status" role="status" aria-live="polite">
        Loading comments...
      </div>
      <ol class="comments-list"></ol>
      <form class="comments-form">
        <label>
          <span>Nickname</span>
          <input
            class="comments-nickname"
            type="text"
            name="nickname"
            autocomplete="name"
            maxlength={80}
            required
          />
        </label>
        <label>
          <span>Comment</span>
          <textarea class="comments-content" name="content" rows={4} maxlength={2000} required />
        </label>
        <button type="submit">Post comment</button>
      </form>
    </section>
  )
}

Comments.afterDOMLoaded = script
Comments.css = style

export default (() => Comments) satisfies QuartzComponentConstructor
