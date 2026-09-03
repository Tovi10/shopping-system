using Microsoft.EntityFrameworkCore;
using ProductsApi.Models;

namespace ProductsApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Category> Categories => Set<Category>();

    public DbSet<Product> Products => Set<Product>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);

    modelBuilder.Entity<Category>()
        .HasMany(c => c.Products)
        .WithOne(p => p.Category)
        .HasForeignKey(p => p.CategoryId)
        .OnDelete(DeleteBehavior.Cascade);

    modelBuilder.Entity<Product>()
        .Property(p => p.Price)
        .HasPrecision(18, 2);

    modelBuilder.Entity<Category>().HasData(
        new Category { Id = 1, Name = "Computers" },
        new Category { Id = 2, Name = "Phones" },
        new Category { Id = 3, Name = "Accessories" }
    );

    modelBuilder.Entity<Product>().HasData(
        new Product
        {
            Id = 1,
            Name = "Laptop",
            Price = 3500,
            CategoryId = 1
        },
        new Product
        {
            Id = 2,
            Name = "Desktop Computer",
            Price = 2800,
            CategoryId = 1
        },
        new Product
        {
            Id = 3,
            Name = "Smartphone",
            Price = 2400,
            CategoryId = 2
        },
        new Product
        {
            Id = 4,
            Name = "Keyboard",
            Price = 120,
            CategoryId = 3
        },
        new Product
        {
            Id = 5,
            Name = "Mouse",
            Price = 60,
            CategoryId = 3
        },
        new Product
        {
            Id = 6,
            Name = "Headphones",
            Price = 250,
            CategoryId = 3
        }
    );
}
}