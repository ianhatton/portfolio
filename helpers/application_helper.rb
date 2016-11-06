# ApplicationHelper
module ApplicationHelper
  def root_path(href)
    if current_page.url == '/'
      href
    else
      "/#{href}"
    end
  end
end
