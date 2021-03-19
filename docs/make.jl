using GeneratorArrays, Documenter 

 # set seed fixed for documentation
DocMeta.setdocmeta!(GeneratorArrays, :DocTestSetup, :(using GeneratorArrays); recursive=true)
makedocs(modules = [GeneratorArrays], 
         sitename = "GeneratorArrays.jl", 
         pages = Any[
            "GeneratorArrays.jl" => "index.md",
            "Distance Functions" => "distance.md",
            "Window Functions" => "window.md",
         ]
        )

deploydocs(repo = "github.com/bionanoimaging/GeneratorArrays.jl.git", devbranch="master")
