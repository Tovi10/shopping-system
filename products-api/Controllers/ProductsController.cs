using Microsoft.AspNetCore.Mvc;
using ProductsApi.Services;

namespace ProductsApi.Controllers;

[ApiController]
[Route("api")]
public class ProductsController : ControllerBase
{
    private readonly ProductService _productService;

    public ProductsController(ProductService productService)
    {
        _productService = productService;
    }

    [HttpGet("categories")]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await _productService.GetCategoriesAsync();

        return Ok(categories);
    }

    [HttpGet("products")]
    public async Task<IActionResult> GetProducts(
        [FromQuery] int? categoryId)
    {
        var products = await _productService.GetProductsAsync(categoryId);

        return Ok(products);
    }
}