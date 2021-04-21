var documenterSearchIndex = {"docs":
[{"location":"distance/#Concrete-IndexFunArrays","page":"Distance Functions","title":"Concrete IndexFunArrays","text":"","category":"section"},{"location":"distance/#Scaling-Types","page":"Distance Functions","title":"Scaling Types","text":"","category":"section"},{"location":"distance/","page":"Distance Functions","title":"Distance Functions","text":"Needed to change the scaling:","category":"page"},{"location":"distance/","page":"Distance Functions","title":"Distance Functions","text":"Sca","category":"page"},{"location":"distance/#IndexFunArrays.Sca","page":"Distance Functions","title":"IndexFunArrays.Sca","text":"Sca\n\nAbstract type to indicate a scaling from which several other types subtype.\n\nPossible subtypes\n\nScaUnit: No scaling of the indices \nScaNorm: Total length along each dimension is normalized to 1\nScaMid: Reaches 1.0 at the borders, if used in combination with CtrMid. Useful for keeping real-space symmetry.\nScaFT: Reciprocal Fourier coordinates compared to Nyquist sampling\nScaFTEdge: Such that the edge (in FFT sense) of the pixel is 1.0\n\n\n\n\n\n","category":"type"},{"location":"distance/#Offset-Types","page":"Distance Functions","title":"Offset Types","text":"","category":"section"},{"location":"distance/","page":"Distance Functions","title":"Distance Functions","text":"Needed to change the reference offset:","category":"page"},{"location":"distance/","page":"Distance Functions","title":"Distance Functions","text":"Ctr","category":"page"},{"location":"distance/#IndexFunArrays.Ctr","page":"Distance Functions","title":"IndexFunArrays.Ctr","text":"Ctr\n\nAbstract type to specify the reference position from which several other types subtype.\n\nPossible subtypes\n\nCtrCorner: Set the reference pixel in the corner\nCtrFFT: Set the reference pixel to the FFT center.\nCtrFT: Set the reference pixel to the FT center. FT means that the zero frequency is at the FFT convention center (size ÷ 2 + 1).\nCtrRFFT: Set the reference pixel to the RFFT center. Same as CtrFFT but the first dimension has center at 1. \nCtrRFT: Set the reference pixel to the RFT center. FT means that the zero frequency is at the FFT convention center (size ÷ 2 + 1).            Same as CtrFT but the first dimension has center at 1.\nCtrMid: Set the reference pixel to real mid. For uneven arrays it is the center pixel, for even arrays it is the centered around a half pixel.\nCtrEnd Set the reference to the end corner (last pixel)\n\n\n\n\n\n","category":"type"},{"location":"distance/#Distance-Functions","page":"Distance Functions","title":"Distance Functions","text":"","category":"section"},{"location":"distance/","page":"Distance Functions","title":"Distance Functions","text":"Some concrete arrays:","category":"page"},{"location":"distance/","page":"Distance Functions","title":"Distance Functions","text":"rr2\nrr\nxx\nyy\nzz\nphiphi\ntt\nee\nramp","category":"page"},{"location":"distance/#IndexFunArrays.rr2","page":"Distance Functions","title":"IndexFunArrays.rr2","text":"rr2([T=Float64], size::NTuple{N, Int};\n    offset=CtrFT,\n    dims=ntuple(+, N),\n    scale=ScaUnit,\n    weight=1,\n    accumulator=sum)\n\nCalculates the squared radius to a reference pixel. In this case CtrFT is the center defined by the FFT convention. ScaUnit leaves the values unscaled. offset and scale can be either of <:Ctr, <:Sca respectively or simply tuples with the same shape as size. Look at ?Ctr and ?Sca for all options. dims is a keyword argument to specifiy over which dimensions the operation will effectively happen.\n\nThe arguments offset, and scale support list-mode, which means that supplying a tuple of tuples or a vector of tuples or a matrix causes the function to automatically generate a superposition of multiple versions of itself. The type of superposition is controlled by the accumulator argument. The relative strength of the individual superposition is controlled via the weight argument, which can be a tuple or vector. Have a look at the Voronoi-example below.\n\nNote that this function is based on a IndexFunArray and therefore does not allocate the full memory needed to represent the array.\n\nExamples\n\njulia> rr2((4, 4))\n4×4 IndexFunArray{Float64, 2, IndexFunArrays.var\"#4#5\"{Float64, Tuple{Float64, Float64}, Tuple{Int64, Int64}}}:\n 8.0  5.0  4.0  5.0\n 5.0  2.0  1.0  2.0\n 4.0  1.0  0.0  1.0\n 5.0  2.0  1.0  2.0\n\nChange Reference Position\n\njulia> rr2((3,3), offset=CtrCorner)\n3×3 IndexFunArray{Float64, 2, IndexFunArrays.var\"#4#5\"{Float64, Tuple{Float64, Float64}, Tuple{Int64, Int64}}}:\n 0.0  1.0  4.0\n 1.0  2.0  5.0\n 4.0  5.0  8.0\n\njulia> rr2((4,4), offset=CtrFT)\n4×4 IndexFunArray{Float64, 2, IndexFunArrays.var\"#4#5\"{Float64, Tuple{Float64, Float64}, Tuple{Int64, Int64}}}:\n 8.0  5.0  4.0  5.0\n 5.0  2.0  1.0  2.0\n 4.0  1.0  0.0  1.0\n 5.0  2.0  1.0  2.0\n\njulia> rr2((4,4), offset=CtrMid)\n4×4 IndexFunArray{Float64, 2, IndexFunArrays.var\"#4#5\"{Float64, Tuple{Float64, Float64}, Tuple{Int64, Int64}}}:\n 4.5  2.5  2.5  4.5\n 2.5  0.5  0.5  2.5\n 2.5  0.5  0.5  2.5\n 4.5  2.5  2.5  4.5\n\njulia> rr2((4,4), offset=CtrEnd)\n4×4 IndexFunArray{Float64, 2, IndexFunArrays.var\"#4#5\"{Float64, Tuple{Float64, Float64}, Tuple{Int64, Int64}}}:\n 18.0  13.0  10.0  9.0\n 13.0   8.0   5.0  4.0\n 10.0   5.0   2.0  1.0\n  9.0   4.0   1.0  0.0\n\njulia> rr2((3, 3), offset=(1, 1))\n3×3 IndexFunArray{Float64, 2, IndexFunArrays.var\"#4#5\"{Float64, Tuple{Int64, Int64}, Tuple{Int64, Int64}}}:\n 0.0  1.0  4.0\n 1.0  2.0  5.0\n 4.0  5.0  8.0\n\nChange Scaling\n\njulia> rr((4,4), scale=ScaUnit)\n4×4 IndexFunArray{Float64, 2, IndexFunArrays.var\"#9#10\"{Float64, Tuple{Float64, Float64}, Tuple{Int64, Int64}}}:\n 2.82843  2.23607  2.0  2.23607\n 2.23607  1.41421  1.0  1.41421\n 2.0      1.0      0.0  1.0\n 2.23607  1.41421  1.0  1.41421\n\njulia> rr((4,4), scale=ScaNorm)\n4×4 IndexFunArray{Float64, 2, IndexFunArrays.var\"#9#10\"{Float64, Tuple{Float64, Float64}, Tuple{Float64, Float64}}}:\n 0.942809  0.745356  0.666667  0.745356\n 0.745356  0.471405  0.333333  0.471405\n 0.666667  0.333333  0.0       0.333333\n 0.745356  0.471405  0.333333  0.471405\n\njulia> rr((4,4), scale=ScaFT)\n4×4 IndexFunArray{Float64, 2, IndexFunArrays.var\"#9#10\"{Float64, Tuple{Float64, Float64}, Tuple{Float64, Float64}}}:\n 0.707107  0.559017  0.5   0.559017\n 0.559017  0.353553  0.25  0.353553\n 0.5       0.25      0.0   0.25\n 0.559017  0.353553  0.25  0.353553\n\njulia> rr((4,4), scale=ScaFTEdge)\n4×4 IndexFunArray{Float64, 2, IndexFunArrays.var\"#9#10\"{Float64, Tuple{Float64, Float64}, Tuple{Float64, Float64}}}:\n 1.41421  1.11803   1.0  1.11803\n 1.11803  0.707107  0.5  0.707107\n 1.0      0.5       0.0  0.5\n 1.11803  0.707107  0.5  0.707107\n\njulia> rr2(Int, (3, 3), offset=(1, 1), scale=(10, 10))\n3×3 IndexFunArray{Int64, 2, IndexFunArrays.var\"#4#5\"{Int64, Tuple{Int64, Int64}, Tuple{Int64, Int64}}}:\n   0  100  400\n 100  200  500\n 400  500  800\n\nApplication to selected dimensions\n\nNote that the code below yields a 3D array but with a one-sized trailing dimension. This can then be used for broadcasting.\n\njulia> x = ones(5,6,5);\n\njulia> y=rr2(selectsizes(x,(1,2)))\n5×6×1 IndexFunArray{Float64, 3, IndexFunArrays.var\"#4#5\"{Float64, Tuple{Float64, Float64, Float64}, Tuple{Int64, Int64, Int64}}}:\n[:, :, 1] =\n 13.0  8.0  5.0  4.0  5.0  8.0\n 10.0  5.0  2.0  1.0  2.0  5.0\n  9.0  4.0  1.0  0.0  1.0  4.0\n 10.0  5.0  2.0  1.0  2.0  5.0\n 13.0  8.0  5.0  4.0  5.0  8.0\n\nSimilarly you can also use dimensions 2 and 3 yielding an array of size(y) == (1,6,5).  Note that the necessary modification to the Base.size function is currently provided by this package.\n\nUsing List-Mode Arguments\n\nThe code below generates 160 Voronoi cells at random positions. The accumulator was set to  mimimum yielding in each pixel the square distance to the closest Voronoi center. See gaussian for another example of using list-mode arguments.\n\njulia> y = rr2((1000,1000),offset = (1000.0,1000.0) .* rand(2,160), accumulator=minimum);\n\n\n\n\nrr2(arr::AbstractArray; offset=CtrFt, scaling=ScaUnit)\n\nThis is a wrapper for  rr2(eltype(arr), size(arr), scaling=scaling, offset=offset).\n\n\n\n\n\n","category":"function"},{"location":"distance/#IndexFunArrays.rr","page":"Distance Functions","title":"IndexFunArrays.rr","text":"rr([T=Float64], size::NTuple{N, Int};\n    offset=CtrFT,\n    dims=ntuple(+, N),\n    scale=ScaUnit,\n    weight=1,\n    accumulator=sum)\n\nSee rr2 for a description of all options.\n\nExamples\n\njulia> rr((3, 3))\n3×3 IndexFunArray{Float64, 2, IndexFunArrays.var\"#9#10\"{Float64, Tuple{Float64, Float64}, Tuple{Int64, Int64}}}:\n 1.41421  1.0  1.41421\n 1.0      0.0  1.0\n 1.41421  1.0  1.41421\n\njulia> rr((3, 3), offset=CtrCorner)\n3×3 IndexFunArray{Float64, 2, IndexFunArrays.var\"#9#10\"{Float64, Tuple{Float64, Float64}, Tuple{Int64, Int64}}}:\n 0.0  1.0      2.0\n 1.0  1.41421  2.23607\n 2.0  2.23607  2.82843\n\n\n\nrr(arr::AbstractArray; offset=CtrFt, scaling=ScaUnit)\n\nThis is a wrapper for  rr(eltype(arr), size(arr), scaling=scaling, offset=offset).\n\n\n\n\n\n","category":"function"},{"location":"distance/#IndexFunArrays.xx","page":"Distance Functions","title":"IndexFunArrays.xx","text":"xx([T=Float64], size::NTuple{N, Int};\n    offset=CtrFT,\n    dims=ntuple(+, N),\n    scale=ScaUnit,\n    weight=1,\n    accumulator=sum)\n\nA distance ramp along first dimension. See rr2 for a description of all options.\n\njulia> xx((4,4))\n4×4 IndexFunArray{Float64, 2, IndexFunArrays.var\"#14#15\"{Float64, Tuple{Float64, Float64}, Tuple{Int64, Int64}}}:\n -2.0  -2.0  -2.0  -2.0\n -1.0  -1.0  -1.0  -1.0\n  0.0   0.0   0.0   0.0\n  1.0   1.0   1.0   1.0\n\n\n\nxx(arr::AbstractArray; offset=CtrFt, scaling=ScaUnit)\n\nThis is a wrapper for  xx(eltype(arr), size(arr), scaling=scaling, offset=offset).\n\n\n\n\n\n","category":"function"},{"location":"distance/#IndexFunArrays.yy","page":"Distance Functions","title":"IndexFunArrays.yy","text":"yy([T=Float64], size::NTuple{N, Int};\n    offset=CtrFT,\n    dims=ntuple(+, N),\n    scale=ScaUnit,\n    weight=1,\n    accumulator=sum)\n\nA distance ramp along second dimension. See rr2 for a description of all options.\n\njulia> yy((4,4))\n4×4 IndexFunArray{Float64, 2, IndexFunArrays.var\"#19#20\"{Float64, Tuple{Float64, Float64}, Tuple{Int64, Int64}}}:\n -2.0  -1.0  0.0  1.0\n -2.0  -1.0  0.0  1.0\n -2.0  -1.0  0.0  1.0\n -2.0  -1.0  0.0  1.0\n\n\n\nyy(arr::AbstractArray; offset=CtrFt, scaling=ScaUnit)\n\nThis is a wrapper for  yy(eltype(arr), size(arr), scaling=scaling, offset=offset).\n\n\n\n\n\n","category":"function"},{"location":"distance/#IndexFunArrays.zz","page":"Distance Functions","title":"IndexFunArrays.zz","text":"zz([T=Float64], size::NTuple{N, Int};\n    offset=CtrFT,\n    dims=ntuple(+, N),\n    scale=ScaUnit,\n    weight=1,\n    accumulator=sum)\n\nA distance ramp along third dimension. See rr2 for a description of all options.\n\njulia> zz((1, 1, 4))\n1×1×4 IndexFunArray{Float64, 3, IndexFunArrays.var\"#24#25\"{Float64, Tuple{Float64, Float64, Float64}, Tuple{Int64, Int64, Int64}}}:\n[:, :, 1] =\n -2.0\n\n[:, :, 2] =\n -1.0\n\n[:, :, 3] =\n 0.0\n\n[:, :, 4] =\n 1.0\n\n\n\nzz(arr::AbstractArray; offset=CtrFt, scaling=ScaUnit)\n\nThis is a wrapper for  zz(eltype(arr), size(arr), scaling=scaling, offset=offset).\n\n\n\n\n\n","category":"function"},{"location":"distance/#IndexFunArrays.phiphi","page":"Distance Functions","title":"IndexFunArrays.phiphi","text":"phiphi([T=Float64], size::NTuple{N, Int};\n    offset=CtrFT,\n    dims=ntuple(+, N),\n    scale=ScaUnit,\n    weight=1,\n    accumulator=sum)\n\nAn azimutal spiral phase ramp using atan(). The azimuthal phase spans dimensions 1 and 2. See rr2 for a description of all options.\n\njulia> phiphi((5, 5))\n5×5 IndexFunArray{Float64, 2, IndexFunArrays.var\"#29#30\"{Float64, Tuple{Float64, Float64}, Tuple{Int64, Int64}}}:\n -2.35619   -2.67795   3.14159  2.67795   2.35619\n -2.03444   -2.35619   3.14159  2.35619   2.03444\n -1.5708    -1.5708    0.0      1.5708    1.5708\n -1.10715   -0.785398  0.0      0.785398  1.10715\n -0.785398  -0.463648  0.0      0.463648  0.785398\n\n\n\nphiphi(arr::AbstractArray; offset=CtrFt, scaling=ScaUnit)\n\nThis is a wrapper for  phiphi(eltype(arr), size(arr), scaling=scaling, offset=offset).\n\n\n\n\n\n","category":"function"},{"location":"distance/#IndexFunArrays.tt","page":"Distance Functions","title":"IndexFunArrays.tt","text":"tt([T=Float64], size::NTuple{N, Int};\n    offset=CtrFT,\n    dims=ntuple(+, N),\n    scale=ScaUnit,\n    weight=1,\n    accumulator=sum)\n\nA distance ramp along fifth (time) dimension. See rr2 for a description of all options.\n\njulia> tt((1, 1, 1, 1, 4))\n1×1×1×1×4 IndexFunArray{Float64, 5, IndexFunArrays.var\"#69#72\"{Float64, NTuple{5, Float64}}}:\n[:, :, 1, 1, 1] =\n -2.0\n\n[:, :, 1, 1, 2] =\n -1.0\n\n[:, :, 1, 1, 3] =\n 0.0\n\n[:, :, 1, 1, 4] =\n 1.0\n\n\n\ntt(arr::AbstractArray; offset=CtrFt, scaling=ScaUnit)\n\nThis is a wrapper for  tt(eltype(arr), size(arr), scaling=scaling, offset=offset).\n\n\n\n\n\n","category":"function"},{"location":"distance/#IndexFunArrays.ee","page":"Distance Functions","title":"IndexFunArrays.ee","text":"ee([T=Float64], size::NTuple{N, Int};\n    offset=CtrFT,\n    dims=ntuple(+, N),\n    scale=ScaUnit,\n    weight=1,\n    accumulator=sum)\n\nA distance ramp along forth (element) dimension. This dimension is often used as a color or wavelength channel. See rr2 for a description of all options.\n\njulia> ee((1, 1, 1, 4))\n1×1×1×4 IndexFunArray{Float64, 4, IndexFunArrays.var\"#60#63\"{Float64, NTuple{4, Float64}}}:\n[:, :, 1, 1] =\n -2.0\n\n[:, :, 1, 2] =\n -1.0\n\n[:, :, 1, 3] =\n 0.0\n\n[:, :, 1, 4] =\n 1.0\n\n\n\nee(arr::AbstractArray; offset=CtrFt, scaling=ScaUnit)\n\nThis is a wrapper for  ee(eltype(arr), size(arr), scaling=scaling, offset=offset).\n\n\n\n\n\n","category":"function"},{"location":"distance/#IndexFunArrays.ramp","page":"Distance Functions","title":"IndexFunArrays.ramp","text":"ramp(::Type{T}, dim::Int, dim_size::Int;\n    offset=CtrFT, scale=ScaUnit,\n    weight=1,\n    accumulator=sum) where {T}\n\nGenerates a dim-dimensional ramp of size dim_size to be used for broadcasting through multidimensional expressions. dim highest dimension of the oriented array to be generated. This is also the ramp direction. dim_size size along this dimension.\n\nFor details about offset and scale and dims see rr2.\n\njulia> ramp(Float32, 1, 7; offset=(2,))\n7-element IndexFunArray{Float32, 1, IndexFunArrays.var\"#434#435\"{Tuple{Int64}, Tuple{Int64}, Int64}}:\n -1\n  0\n  1\n  2\n  3\n  4\n  5\n\nramp(dim::Int, dim_size::Int; offset=CtrFt, scaling=ScaUnit)\n\nThis is a wrapper for  ramp(Float64, dim::Int, dim_size::Int; offset=CtrFt, scaling=ScaUnit).\n\n\n\n\n\n","category":"function"},{"location":"window/#Window-Functions","page":"Window Functions","title":"Window Functions","text":"","category":"section"},{"location":"window/","page":"Window Functions","title":"Window Functions","text":"Several kinds of window functions","category":"page"},{"location":"window/","page":"Window Functions","title":"Window Functions","text":"IndexFunArrays.window_radial_linear\nIndexFunArrays.window_hanning\nIndexFunArrays.window_radial_hamming\nIndexFunArrays.window_hamming\nIndexFunArrays.window_radial_hanning\nIndexFunArrays.window_edge\nIndexFunArrays.window_radial_blackman_harris\nIndexFunArrays.window_blackman_harris\nIndexFunArrays.window_radial_edge\nIndexFunArrays.window_linear","category":"page"},{"location":"window/#IndexFunArrays.window_radial_linear","page":"Window Functions","title":"IndexFunArrays.window_radial_linear","text":"window_radial_linear([T=Float64], size::NTuple; \n            offset=CtrFT, scale=ScaFTEdge, border_in=0.8, border_out=1.0, dims=ntuple(+, N))\n\nA multidimensional radial window with a linear transition from zero at the borders (border_out) to one (border_in). Note that border_in and border_out need to be scalar values for radial type windows. The elypticity can be adjusted via the scale parameter. With the default offset and scale the borders are specified relative to the edge.\n\njulia> window_radial_linear((4,5),border_in=0.0)\n4×5 IndexFunArray{Float64, 2, IndexFunArrays.var\"#59#60\"{Float64, Tuple{Float64, Float64}, Tuple{Float64, Float64}, Float64, Float64}}:\n 0.0  0.0       0.0  0.0       0.0\n 0.0  0.292893  0.5  0.292893  0.0\n 0.0  0.5       1.0  0.5       0.0\n 0.0  0.292893  0.5  0.292893  0.0\n\n\n\nwindow_radial_linear(arr::AbstractArray; offset=CtrFt, scaling=ScaUnit,\n                     border_in=0.8, border_out=1.0, dims=ntuple(+, N))\n\nThis is a wrapper for  window_radial_linear(eltype(arr), size(arr), scaling=scaling, offset=offset, border_in=border_in, border_out=border_out).\n\n\n\n\n\n","category":"function"},{"location":"window/#IndexFunArrays.window_hanning","page":"Window Functions","title":"IndexFunArrays.window_hanning","text":"window_hanning([T=Float64], size::NTuple; \n                   offset=CtrFT, scale=ScaFTEdge, border_in=0.8, border_out=1.0, dims=ntuple(+, N))\n\nA multidimensional (separable) window with a von Hann transition between the borders (border_out) to one (border_in). See ?window_linear for more details on the arguments.\n\n\n\nwindow_hanning(arr::AbstractArray;\n                   offset=CtrFT, scale=ScaFTEdge, border_in=0.8, border_out=1.0, dims=ntuple(+, N))\n\nThis is a wrapper for  window_hanning(eltype(arr), size(arr), scaling=scaling, offset=offset, border_in=border_in, border_out=border_out).\n\n\n\n\n\n","category":"function"},{"location":"window/#IndexFunArrays.window_radial_hamming","page":"Window Functions","title":"IndexFunArrays.window_radial_hamming","text":"window_radial_hamming([T=Float64], size::NTuple; \n                      offset=CtrFT, scale=ScaFTEdge, border_in=0.8, border_out=1.0, dims=ntuple(+, N))\n\nA multidimensional radial window with a Hamming transition between the borders (border_out) to one (border_in). Note that border_in and border_out need to be scalar values for radial type windows. The elypticity can be adjusted via the scale parameter. See ?window_radial_linear for more details on the arguments.\n\n\n\nwindow_radial_hamming(arr::AbstractArray;\n                      offset=CtrFT, scale=ScaFTEdge, border_in=0.8, border_out=1.0, dims=ntuple(+, N))\n\nThis is a wrapper for  window_radial_hamming(eltype(arr), size(arr), scaling=scaling, offset=offset, border_in=border_in, border_out=border_out).\n\n\n\n\n\n","category":"function"},{"location":"window/#IndexFunArrays.window_hamming","page":"Window Functions","title":"IndexFunArrays.window_hamming","text":"window_hamming([T=Float64], size::NTuple; \n               offset=CtrFT, scale=ScaFTEdge, border_in=0.8, border_out=1.0, dims=ntuple(+, N))\n\nA multidimensional (separable) window with a Hamming transition between the borders (border_out) to one (border_in). See ?window_linear for more details on the arguments.\n\n\n\nwindow_hamming(arr::AbstractArray;\n               offset=CtrFT, scale=ScaFTEdge, border_in=0.8, border_out=1.0, dims=ntuple(+, N))\n\nThis is a wrapper for  window_hamming(eltype(arr), size(arr), scaling=scaling, offset=offset, border_in=border_in, border_out=border_out).\n\n\n\n\n\n","category":"function"},{"location":"window/#IndexFunArrays.window_radial_hanning","page":"Window Functions","title":"IndexFunArrays.window_radial_hanning","text":"window_radial_hanning([T=Float64], size::NTuple; \n                   offset=CtrFT, scale=ScaFTEdge, border_in=0.8, border_out=1.0, dims=ntuple(+, N))\n\nA multidimensional radial window with a von Hann transition between the borders (border_out) to one (border_in). Note that border_in and border_out need to be scalar values for radial type windows. The elypticity can be adjusted via the scale parameter. See ?window_radial_linear for more details on the arguments.\n\n\n\nwindow_radial_hanning(arr::AbstractArray;\n                      offset=CtrFT, scale=ScaFTEdge, border_in=0.8, border_out=1.0, dims=ntuple(+, N))\n\nThis is a wrapper for  window_radial_hanning(eltype(arr), size(arr), scaling=scaling, offset=offset, border_in=border_in, border_out=border_out).\n\n\n\n\n\n","category":"function"},{"location":"window/#IndexFunArrays.window_edge","page":"Window Functions","title":"IndexFunArrays.window_edge","text":"window_edge([T=Float64], size::NTuple; \n            offset=CtrFT, scale=ScaFTEdge, border_in=0.8, border_out=1.0, dims=ntuple(+, N))\n\nA multidimensional (separable) window with a sudden transition half way between the borders (border_out) to one (border_in). See ?window_linear for more details on the arguments.\n\n\n\nwindow_edge(arr::AbstractArray; offset=CtrFt, scaling=ScaUnit,\n                                  border_in=0.8, border_out=1.0)\n\nThis is a wrapper for  window_edge(eltype(arr), size(arr), scaling=scaling, offset=offset, border_in=border_in, border_out=border_out).\n\n\n\n\n\n","category":"function"},{"location":"window/#IndexFunArrays.window_radial_blackman_harris","page":"Window Functions","title":"IndexFunArrays.window_radial_blackman_harris","text":"window_radial_blackman_harris([T=Float64], size::NTuple; \n                      offset=CtrFT, scale=ScaFTEdge, border_in=0.8, border_out=1.0, dims=ntuple(+, N))\n\nA multidimensional radial window with a Hamming transition according to Blackman/Harris between the borders (border_out) to one (border_in). Note that border_in and border_out need to be scalar values for radial type windows. The elypticity can be adjusted via the scale parameter. See ?window_radial_linear for more details on the arguments.\n\n\n\nwindow_radial_blackman_harris(arr::AbstractArray;\n                              offset=CtrFT, scale=ScaFTEdge, border_in=0.8, border_out=1.0, dims=ntuple(+, N))\n\nThis is a wrapper for  window_radial_blackman_harris(eltype(arr), size(arr), scaling=scaling, offset=offset, border_in=border_in, border_out=border_out).\n\n\n\n\n\n","category":"function"},{"location":"window/#IndexFunArrays.window_blackman_harris","page":"Window Functions","title":"IndexFunArrays.window_blackman_harris","text":"window_blackman_harris([T=Float64], size::NTuple; \n                      offset=CtrFT, scale=ScaFTEdge, border_in=0.8, border_out=1.0, dims=ntuple(+, N))\n\nA multidimensional (separable) window with a  transition according to Blackman/Harris between the borders (border_out) to one (border_in). See ?window_linear for more details on the arguments.\n\n\n\nwindow_blackman_harris(arr::AbstractArray;\n                      offset=CtrFT, scale=ScaFTEdge, border_in=0.8, border_out=1.0, dims=ntuple(+, N))\n\nThis is a wrapper for  window_blackman_harris(eltype(arr), size(arr), scaling=scaling, offset=offset, border_in=border_in, border_out=border_out).\n\n\n\n\n\n","category":"function"},{"location":"window/#IndexFunArrays.window_radial_edge","page":"Window Functions","title":"IndexFunArrays.window_radial_edge","text":"window_radial_edge([T=Float64], size::NTuple; \n            offset=CtrFT, scale=ScaFTEdge, border_in=0.8, border_out=1.0, dims=ntuple(+, N))\n\nA multidimensional radial window (disk) with a sudden transition half way between the borders (border_out) to one (border_in). Note that border_in and border_out need to be scalar values for radial type windows. The elypticity can be adjusted via the scale parameter. See ?window_radial_linear for more details on the arguments.\n\n\n\nwindow_radial_edge(arr::AbstractArray; \n                   offset=CtrFT, scale=ScaFTEdge, border_in=0.8, border_out=1.0, dims=ntuple(+, N))\n\nThis is a wrapper for  window_radial_edge(eltype(arr), size(arr), scaling=scaling, offset=offset, border_in=border_in, border_out=border_out).\n\n\n\n\n\n","category":"function"},{"location":"window/#IndexFunArrays.window_linear","page":"Window Functions","title":"IndexFunArrays.window_linear","text":"window_linear([T=Float64], size::NTuple; \n            offset=CtrFT, scale=ScaFTEdge, border_in=0.8, border_out=1.0, dims=ntuple(+, N))\n\nA multidimensional (separable) window with a linear transition from zero at the borders (border_out) to one (border_in).\n\njulia> window_linear((8,9),border_in=0.0)\n8×9 IndexFunArray{Float64, 2, IndexFunArrays.var\"#34#35\"{Float64, Tuple{Float64, Float64}, Tuple{Float64, Float64}, Float64, Float64}}:\n 0.0  0.0     0.0    0.0     0.0   0.0     0.0    0.0     0.0\n 0.0  0.0625  0.125  0.1875  0.25  0.1875  0.125  0.0625  0.0\n 0.0  0.125   0.25   0.375   0.5   0.375   0.25   0.125   0.0\n 0.0  0.1875  0.375  0.5625  0.75  0.5625  0.375  0.1875  0.0\n 0.0  0.25    0.5    0.75    1.0   0.75    0.5    0.25    0.0\n 0.0  0.1875  0.375  0.5625  0.75  0.5625  0.375  0.1875  0.0\n 0.0  0.125   0.25   0.375   0.5   0.375   0.25   0.125   0.0\n 0.0  0.0625  0.125  0.1875  0.25  0.1875  0.125  0.0625  0.0\n\n\n\nwindow_linear(arr::AbstractArray; offset=CtrFt, scaling=ScaUnit,\n                                  border_in=0.8, border_out=1.0)\n\nThis is a wrapper for  window_linear(eltype(arr), size(arr), scaling=scaling, offset=offset, border_in=border_in, border_out=border_out).\n\n\n\n\n\n","category":"function"},{"location":"#IndexFunArrays.jl","page":"IndexFunArrays.jl","title":"IndexFunArrays.jl","text":"","category":"section"},{"location":"","page":"IndexFunArrays.jl","title":"IndexFunArrays.jl","text":"Here you can find the docstrings of all functions. We also provide several concrete generators.","category":"page"},{"location":"#IndexFunArray-Interface","page":"IndexFunArrays.jl","title":"IndexFunArray Interface","text":"","category":"section"},{"location":"","page":"IndexFunArrays.jl","title":"IndexFunArrays.jl","text":"The abstract IndexFunArray definition","category":"page"},{"location":"","page":"IndexFunArrays.jl","title":"IndexFunArrays.jl","text":"IndexFunArray","category":"page"},{"location":"#IndexFunArrays.IndexFunArray","page":"IndexFunArrays.jl","title":"IndexFunArrays.IndexFunArray","text":"IndexFunArray([T], gen::F, size::NTuple{N,Int}) where {N,F}\n\nGenerate a IndexFunArray object which behaves like an array but does not allocate the full array. Instead it calculates the elements when needed. This is useful to prevent array allocations. gen is a function which takes the array indices wrapped as tuple as input. The output of gen determines the element type of the resulting array. size is the output size of the resulting array. T can be the optional element type of the arrays.  gen needs to have T as return type, otherwise the IndexFunArray might be type unstable.\n\nExamples\n\njulia> IndexFunArray(x -> sum(x), (3, 3))\n3×3 IndexFunArray{Int64, 2, var\"#182#183\"}:\n 2  3  4\n 3  4  5\n 4  5  6\n\njulia> IndexFunArray(x -> sum(abs2.(x)), (3, 3))\n3×3 IndexFunArray{Int64, 2, var\"#184#185\"}:\n  2   5  10\n  5   8  13\n 10  13  18\n\njulia> IndexFunArray(x -> (x[1], x[2], \"Julia\"), (3,3))\n3×3 IndexFunArray{Tuple{Int64, Int64, String}, 2, var\"#18#19\"}:\n (1, 1, \"Julia\")  (1, 2, \"Julia\")  (1, 3, \"Julia\")\n (2, 1, \"Julia\")  (2, 2, \"Julia\")  (2, 3, \"Julia\")\n (3, 1, \"Julia\")  (3, 2, \"Julia\")  (3, 3, \"Julia\")\n\n\n\n\n\n","category":"type"},{"location":"#Indices-with-certain-type","page":"IndexFunArrays.jl","title":"Indices with certain type","text":"","category":"section"},{"location":"","page":"IndexFunArrays.jl","title":"IndexFunArrays.jl","text":"idx\ncpx","category":"page"},{"location":"#IndexFunArrays.idx","page":"IndexFunArrays.jl","title":"IndexFunArrays.idx","text":"idx([T=Float64], size::NTuple{N, Int};\n    offset=CtrFT,\n    dims=ntuple(+, N),\n    scale=ScaUnit)\n\nSee rr2 for a description of all options.\n\nReturns basically the CartesianIndices but as a tuple and accounting for optional scale, offset and data type. Note that T is enforced element-wise for the return tuple elements.\n\njulia> idx(Int, (3,3), offset=CtrCorner)\n3×3 IndexFunArray{Tuple{Int64, Int64}, 2, IndexFunArrays.var\"#39#40\"{Int64, Tuple{Float64, Float64}, Tuple{Int64, Int64}}}:\n (0, 0)  (0, 1)  (0, 2)\n (1, 0)  (1, 1)  (1, 2)\n (2, 0)  (2, 1)  (2, 2)\n\njulia> idx(Int, (3,3), offset=(0,0))\n3×3 IndexFunArray{Tuple{Int64, Int64}, 2, IndexFunArrays.var\"#39#40\"{Int64, Tuple{Int64, Int64}, Tuple{Int64, Int64}}}:\n (1, 1)  (1, 2)  (1, 3)\n (2, 1)  (2, 2)  (2, 3)\n (3, 1)  (3, 2)  (3, 3)\n\njulia> idx(Float32, (3,3), offset=(0,0))\n3×3 IndexFunArray{Tuple{Float32, Float32}, 2, IndexFunArrays.var\"#39#40\"{Float32, Tuple{Int64, Int64}, Tuple{Int64, Int64}}}:\n (1.0, 1.0)  (1.0, 2.0)  (1.0, 3.0)\n (2.0, 1.0)  (2.0, 2.0)  (2.0, 3.0)\n (3.0, 1.0)  (3.0, 2.0)  (3.0, 3.0)\n\n\n\n\n\n","category":"function"},{"location":"#IndexFunArrays.cpx","page":"IndexFunArrays.jl","title":"IndexFunArrays.cpx","text":"cpx([T=Float64], size::NTuple{N, Int};\n    offset=CtrFT,\n    dims=ntuple(+, N),\n    scale=ScaUnit)\n\nSee rr2 for a description of all options.\n\nReturns an IndexFunArray where each positon corresponds to a complex value according to its position. The parameters offset and scale can be used accordingly (see rr2). Note that T is enforced element-wise for the return tuple elements.\n\njulia> cpx(Int, (3,3), offset=CtrCorner)\n3×3 Matrix{Complex{Int64}}:\n 0+0im  0+1im  0+2im\n 1+0im  1+1im  1+2im\n 2+0im  2+1im  2+2im\n\njulia> cpx(Int, (3,3), offset=(0,0))\n3×3 Matrix{Complex{Int64}}:\n 1+1im  1+2im  1+3im\n 2+1im  2+2im  2+3im\n 3+1im  3+2im  3+3im\n\njulia> cpx((3,3), offset=(0,0))\n3×3 Matrix{ComplexF64}:\n 1.0+1.0im  1.0+2.0im  1.0+3.0im\n 2.0+1.0im  2.0+2.0im  2.0+3.0im\n 3.0+1.0im  3.0+2.0im  3.0+3.0im\n\n\n\n\n\n","category":"function"},{"location":"#Helpful-Array-Functions","page":"IndexFunArrays.jl","title":"Helpful Array Functions","text":"","category":"section"},{"location":"","page":"IndexFunArrays.jl","title":"IndexFunArrays.jl","text":"In addition to normal size one can imagine a selectsizes which returns the sizes of several dimensions simultaneously.","category":"page"},{"location":"","page":"IndexFunArrays.jl","title":"IndexFunArrays.jl","text":"selectsizes\nIndexFunArrays.single_dim_size","category":"page"},{"location":"#IndexFunArrays.selectsizes","page":"IndexFunArrays.jl","title":"IndexFunArrays.selectsizes","text":"selectsizes(x::AbstractArray, dim; keep_dims=true)\n\nAdditional size method to access the size at several dimensions in one call. keep_dims allows to return the other dimensions as singletons.\n\nExamples\n\njulia> x = ones((2,4,6,8, 10));\n\njulia> selectsizes(x, (2,3))\n(1, 4, 6, 1, 1)\n\njulia> selectsizes(x, 5)\n(1, 1, 1, 1, 10)\n\njulia> selectsizes(x, (5,))\n(1, 1, 1, 1, 10)\n\njulia> selectsizes(x, (2,3,4), keep_dims=false)\n(4, 6, 8)\n\njulia> selectsizes(x, (4,3,2), keep_dims=false)\n(8, 6, 4)\n\n\n\n\n\n","category":"function"},{"location":"#IndexFunArrays.single_dim_size","page":"IndexFunArrays.jl","title":"IndexFunArrays.single_dim_size","text":"single_dim_size(dim::Int,dim_size::Int)\n\nReturns a tuple (length dim) of singleton sizes except at the final position dim, which contains dim_size\n\nExample\n\njulia> IndexFunArrays.single_dim_size(4, 3)\n(1, 1, 1, 3)\n\njulia> IndexFunArrays.single_dim_size(4, 5)\n(1, 1, 1, 5)\n\njulia> IndexFunArrays.single_dim_size(2, 5)\n(1, 5)\n\n\n\n\n\n","category":"function"}]
}
