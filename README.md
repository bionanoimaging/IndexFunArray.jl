# IndexFunArrays.jl
This package allows to generate complex array expressions based on the indices.
The `IndexFunArray` does not allocate memory but instead is entry-wise generated once it is accessed.
`IndexFunArray <: AbstractArray` and behaves almost like a normal array.


| **Documentation**                       | **Build Status**                          | **Code Coverage**               |
|:---------------------------------------:|:-----------------------------------------:|:-------------------------------:|
| [![][docs-stable-img]][docs-stable-url] [![][docs-dev-img]][docs-dev-url] | [![][CI-img]][CI-url] | [![][codecov-img]][codecov-url] |



## Installation
Not registered yet,
Type `]`in the REPL to get to the package manager:
```julia
julia> ] add https://github.com/bionanoimaging/IndexFunArrays.jl 
```


## Quick Examples
```julia
julia> rr2((4,4), offset=CtrMid)  # IndexFunArray containing the square of the radius to the mid position
  4×4 IndexFunArray{Float64, 2, IndexFunArrays.var"#4#5"{Float64, Tuple{Float64, Float64}, Tuple{Int64, Int64}}}:
   4.5  2.5  2.5  4.5
   2.5  0.5  0.5  2.5
   2.5  0.5  0.5  2.5
   4.5  2.5  2.5  4.5

julia> rr2((3, 3), offset=(1, 1)) # square distance to the top left pixel
  3×3 IndexFunArray{Float64, 2, IndexFunArrays.var"#4#5"{Float64, Tuple{Int64, Int64}, Tuple{Int64, Int64}}}:
   0.0  1.0  4.0
   1.0  2.0  5.0
   4.0  5.0  8.0

julia> rr((4,4), scale=ScaUnit)  # distance (not square) to the Fourier-center with unity pixel scaling
  4×4 IndexFunArray{Float64, 2, IndexFunArrays.var"#9#10"{Float64, Tuple{Float64, Float64}, Tuple{Int64, Int64}}}:
   2.82843  2.23607  2.0  2.23607
   2.23607  1.41421  1.0  1.41421
   2.0      1.0      0.0  1.0
   2.23607  1.41421  1.0  1.41421

julia> IndexFunArray(x -> sum(abs2.(x)), (3, 3))   # directly using the constructor and supplying a function to store in the array
  3×3 IndexFunArray{Int64, 2, var"#184#185"}:
    2   5  10
    5   8  13
   10  13  18
```


## More complex examples
If we assume the following situation where we have a large array created. We can assign the `IndexFunArray` (in this case `rr` being the distance to a reference position)
to this array without allocation of a significant amount of new memory:
```julia
julia> @time x = randn((10000, 10000));
  0.278858 seconds (25 allocations: 762.959 MiB, 1.31% gc time)

julia> @time x = randn((10000, 10000));
  0.261548 seconds (2 allocations: 762.940 MiB, 0.96% gc time)

julia> using IndexFunArrays

julia> @time x .= rr(size(x));
  0.361640 seconds (1.18 M allocations: 70.353 MiB, 46.29% compilation time)

julia> @time x .= rr(size(x));
  0.194074 seconds (11 allocations: 496 bytes)
```

We can see that there is only a small number of 496 bytes allocated and not the full ~763MiB.
The following benchmark shows that the performance is almost as good as with `CartesianIndices`:
```julia
julia> include("examples/benchmark.jl")
compare_to_CartesianIndices (generic function with 1 method)

julia> compare_to_CartesianIndices()
[ Info: rr2 based
  1.981 ms (18 allocations: 720 bytes)
  1.979 ms (18 allocations: 720 bytes)
[ Info: CartesianIndices based
  1.938 ms (0 allocations: 0 bytes)
  1.940 ms (0 allocations: 0 bytes)
[ Info: CartesianIndices based with initialized function
  1.941 ms (0 allocations: 0 bytes)
  1.942 ms (0 allocations: 0 bytes)
```

## Why this package?
In image processing and other applications you often encounter position-dependent functions some of which can be a bit of work to code.
It helps the thinking to picture such functions as arrays, which contain the index-dependent values. A good examples are windowing functions.
Another more complicated example is a complex-values free-space (optical) propagator.
Yet storing such arrays can be memory intensive and slow and one would ideally perform such calculations "on-the-fly", e.g. only when applying the filter
to the Fourier-transformation. Julia has a great mechanism for this: syntactic loop fusion and broadcasting (e.g. using ".*").

Using CartesianIndices() it is possible to write such index-expressions yet they do not "feel" like arrays.
IndexFunArrays allow index-based calculations to look like arrays and to take part in loop fusion. This eases the writing of more complicated expressions without loss in speed
due to Julia's syntactic loop fusion mechanism.
You can think of a `IndexFunArray` of being an array that stores an expression calculating with indices inside.
This also means you cannot assing to such arrays which also precludes using range indices. However views are possible and range indices can be applied to such views.
Of course such arrays can generate any datatype. See `?IndexFunArray` for more detail.


[docs-dev-img]: https://img.shields.io/badge/docs-dev-pink.svg 
[docs-dev-url]: https://bionanoimaging.github.io/IndexFunArrays.jl/dev/

[docs-stable-img]: https://img.shields.io/badge/docs-stable-darkgreen.svg 
[docs-stable-url]: https://bionanoimaging.github.io/IndexFunArrays.jl/stable/

[CI-img]: https://github.com/bionanoimaging/IndexFunArrays.jl/actions/workflows/ci.yml/badge.svg
[CI-url]: https://github.com/bionanoimaging/IndexFunArrays.jl/actions/workflows/ci.yml

[codecov-img]: https://codecov.io/gh/bionanoimaging/IndexFunArrays.jl/branch/master/graph/badge.svg?token=P0YYCPKXI1
[codecov-url]: https://codecov.io/gh/bionanoimaging/IndexFunArrays.jl

