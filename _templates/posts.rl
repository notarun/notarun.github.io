extends base

replace content
  h1
    "blog"

  p
    "random notes, thoughts, guides"

  ul
    for post of data.posts
      li
        a href: "#{post.path}"
          "#{post.title}"

        time datetime: ""
          "#{post.publishedAt}"
