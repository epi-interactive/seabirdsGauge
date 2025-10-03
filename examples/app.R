library(shiny)
library(dplyr)

# Translations
library(jsonlite)
library(shiny.i18n)

#' Only use `load_all` in the example app.
#' See the README for instructions on how to install the package for the
#' actual application.
devtools::load_all("../")
library(seabirdsGauge)

# Translation setup - copied from global.R
g_i18n <- shiny.i18n::Translator$new(translation_json_path = "translations.json")
g_i18n$set_translation_language("eng")

ui <- fluidPage(
  theme = bslib::bs_theme(version = 5),
  shinyjs::useShinyjs(),
  tags$head(
    tags$link(rel = "stylesheet", href = "main.css"),
  ),
  div(
    style = "display: grid; grid-template-columns: 1fr 1fr; gap: 10px;",
    seabirdsGauge::gaugePlotOutput("plot", height = "500px", width = "100%"),
    selectInput(
      "rating",
      "Rating",
      c("Empty", "None", "Poor", "Partial", "Best")
    )
  ),
  #' Needed to allow the icons to render from JS just in the example app.
  #' It adds the fontawesome dependencies to the head.
  #' In the actual application, you would not need this as we use icons via R
  #' and fontawesome dependencies are added automatically.
  icon("xmark")
)

server <- function(input, output, session) {
  output$plot <- seabirdsGauge::renderGaugePlot({
    seabirdsGauge::gaugePlot(
      g_i18n,
      rating = ifelse(is.null(input$rating), "Empty", input$rating)
    )
  })
}

if (interactive()) {
  shinyApp(ui, server)
}
