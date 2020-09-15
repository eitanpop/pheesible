﻿using System;
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
        public virtual DbSet<FocusGroups> FocusGroups { get; set; }
        public virtual DbSet<PromotionFocusGroup> PromotionFocusGroup { get; set; }
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

            modelBuilder.Entity<FocusGroups>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnType("character varying");
            });

            modelBuilder.Entity<PromotionFocusGroup>(entity =>
            {
                entity.HasOne(d => d.FocusGroup)
                    .WithMany(p => p.PromotionFocusGroup)
                    .HasForeignKey(d => d.FocusGroupId)
                    .HasConstraintName("fk_focusgroup");

                entity.HasOne(d => d.Promotion)
                    .WithMany(p => p.PromotionFocusGroup)
                    .HasForeignKey(d => d.PromotionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_promotion");
            });

            modelBuilder.Entity<Promotions>(entity =>
            {
                entity.Property(e => e.Id).HasDefaultValueSql("nextval('promotions_id_seq'::regclass)");

                entity.Property(e => e.Banner).HasColumnType("character varying");

                entity.Property(e => e.IdentityId).HasColumnType("character varying");

                entity.Property(e => e.ImageOne).HasColumnType("character varying");

                entity.Property(e => e.ImageThree).HasColumnType("character varying");

                entity.Property(e => e.ImageTwo).HasColumnType("character varying");

                entity.Property(e => e.Logo).HasColumnType("character varying");

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
