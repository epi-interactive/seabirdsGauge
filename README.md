# Gauge Plot for the Seabirds Dashboard

This folder contains the code for the Gauge Plot used in the Seabirds Dashboard as an HTML widget.

## Installation Instructions

### Installing from GitHub

To install the package from GitHub (required for shinyapps.io deployment):

```r
remotes::install_github("Epi-interactive-Ltd/seabirdsGauge@v0.0.1")
```

### Installing Locally

To install the package locally, first clone the repository and then install the dependencies:

```r
install.packages("devtools")
devtools::install_deps() # Install dependencies
```

Then to build the package locally:

```r
devtools::document()
devtools::install()
devtools::build()
```

That will create a `.tar.gz` file in the root directory of this project. You can then install it with:

```
install.packages("seabirdsGauge_0.0.1.tar.gz", repos = NULL, type = "source")
```

And make sure to all it locally to the `renv` environment:

```
renv::install("seabirdsGauge_0.0.1.tar.gz")
```

If you every update the package you must rebuild it and reinstall it.
You will need to uninstall the old version of the package before installing the new one:

```r
detach("package:seabirdsGauge", unload = TRUE)
install.packages("seabirdsGauge_0.0.1.tar.gz", repos = NULL, type = "source")
library(seabirdsGauge)
renv::install("seabirdsGauge_0.0.1.tar.gz")
```

## Usage

See `seabirdsGauge/examples/app.R` for an example of how to use the gauge plot in a Shiny app.

## React

```

reactR::scaffoldReactWidget("gaugePlot")

system("npm install --global yarn")
system("yarn install")
system("yarn run webpack --mode=development")
devtools::document()
devtools::install()


# Everytime you make a change to the React code you must:
system("yarn install") # Only if you added new packages
system("yarn run webpack --mode=development")
devtools::document()
devtools::install(quick = TRUE)

shiny::runApp("examples") # If you want to test it in the examples folder


# If you only make changes to the R code you can just do:
devtools::document()
devtools::install(quick = TRUE)


# Before committing changes to git you need to build the package for production:
system("yarn install")
system("yarn run webpack --mode=development")
devtools::document()
devtools::install()
devtools::build()
```
