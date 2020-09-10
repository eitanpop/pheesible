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

        public virtual DbSet<Features> Features { get; set; }
        public virtual DbSet<Promotions> Promotions { get; set; }
        public virtual DbSet<SellingPoints> SellingPoints { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Features>(entity =>
            {
                entity.Property(e => e.Description).IsRequired();

                entity.Property(e => e.Title).IsRequired();

                entity.HasOne(d => d.Promotion)
                    .WithMany(p => p.Features)
                    .HasForeignKey(d => d.PromotionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_promotions");
            });

            modelBuilder.Entity<Promotions>(entity =>
            {
                entity.Property(e => e.Id).HasDefaultValueSql("nextval('promotions_id_seq'::regclass)");

                entity.Property(e => e.SubId)
                    .IsRequired()
                    .HasMaxLength(20);
            });

            modelBuilder.Entity<SellingPoints>(entity =>
            {
                entity.HasOne(d => d.Promotion)
                    .WithMany(p => p.SellingPoints)
                    .HasForeignKey(d => d.PromotionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_promotions");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
