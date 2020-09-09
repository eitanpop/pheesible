using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Pheesible.Promotions.EF
{
    public partial class PromotionContext : DbContext
    {
        public PromotionContext()
        {
        }

        public PromotionContext(DbContextOptions<PromotionContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Promotions> Promotions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Promotions>(entity =>
            {
                entity.Property(e => e.SubId)
                    .IsRequired()
                    .HasColumnType("character varying");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
