doctype html
  head
    meta charset: "utf-8"
    meta name: "viewport" content: "initial-scale=1"

    style
      !"#{stylesheet}"

    title
      if data.pageTitle
        "#{data.pageTitle} - #{siteTitle}"
      else
        "#{siteTitle}"

  body
    main
      block content
