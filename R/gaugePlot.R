#' Get a gauge plot for use in the app.
#'
#' @import htmlwidgets
#'
#' @export
gaugePlot <- function(
  translator,
  rating = "Empty",
  type = "practices",
  width = NULL,
  height = NULL,
  elementId = NULL
) {
  if (is.null(rating) || tolower(rating) == "null") {
    rating <- "Empty"
  }

  typeText <- switch(
    type,
    practices = translator$t("practices_gauge_text_plot"),
    translator$t("monitoring_gauge_text_plot")
  )
  ratingText <- list(
    Empty = translator$t(paste0(type, "_gauge_text_empty")),
    None = typeText,
    Poor = typeText,
    Partial = typeText,
    Best = typeText
  )

  boldRatingText <- list(
    Empty = "",
    None = translator$t("none_rating"),
    Poor = translator$t("poor_rating"),
    Partial = translator$t("partial_rating"),
    Best = translator$t("best_rating")
  )

  ratingBoxText <- list(
    Empty = "",
    None = translator$t(paste0(type, "_none_safety_rating")),
    Poor = translator$t(paste0(type, "_poor_safety_rating")),
    Partial = translator$t(paste0(type, "_partial_safety_rating")),
    Best = translator$t(paste0(type, "_best_safety_rating"))
  )

  content <- reactR::component(
    "GaugePlot",
    list(
      initialRating = rating,
      ratingText = ratingText,
      boldRatingText = boldRatingText,
      ratingBoxText = ratingBoxText
    )
  )

  htmlwidgets::createWidget(
    name = 'gaugePlot',
    reactR::reactMarkup(content),
    width = width,
    height = height,
    package = 'seabirdsGauge',
    elementId = elementId
  )
}

#' Called by HTMLWidgets to produce the widget's root element.
#' @noRd
widget_html.gaugePlot <- function(id, style, class, ...) {
  htmltools::tagList(
    # Necessary for RStudio viewer version < 1.2
    reactR::html_dependency_corejs(),
    reactR::html_dependency_react(),
    reactR::html_dependency_reacttools(),
    htmltools::tags$div(id = id, class = class, style = style)
  )
}

#' Shiny bindings for gaugePlot
#'
#' Output and render functions for using gaugePlot within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a gaugePlot
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name gaugePlot-shiny
#'
#' @export
gaugePlotOutput <- function(outputId, width = '100%', height = 'fit-content') {
  htmlwidgets::shinyWidgetOutput(outputId, 'gaugePlot', width, height, package = 'seabirdsGauge')
}

#' @rdname gaugePlot-shiny
#' @export
renderGaugePlot <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) {
    expr <- substitute(expr)
  } # force quoted
  htmlwidgets::shinyRenderWidget(expr, gaugePlotOutput, env, quoted = TRUE)
}
