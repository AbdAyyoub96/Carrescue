using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CarRescue.Models
{
    public partial class CarRescueContext : DbContext
    {
        public CarRescueContext()
        {
        }

        public CarRescueContext(DbContextOptions<CarRescueContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Notification> Notification { get; set; }
        public virtual DbSet<Order> Order { get; set; }
        public virtual DbSet<OrderOffer> OrderOffer { get; set; }
        public virtual DbSet<Rating> Rating { get; set; }
        public virtual DbSet<Report> Report { get; set; }
        public virtual DbSet<Service> Service { get; set; }
        public virtual DbSet<ServiceComponent> ServiceComponent { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<UserType> UserType { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("data source=IT-Taha;initial catalog=CarRescue;Trusted_Connection=True;MultipleActiveResultSets=True;App=EntityFramework&quot;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.3-servicing-35854");

            modelBuilder.Entity<Notification>(entity =>
            {
                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Link).HasMaxLength(100);

                entity.Property(e => e.Message).IsRequired();

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Notification)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Notification_User");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.Property(e => e.CreatedDate).HasColumnType("date");

                entity.Property(e => e.GasType).HasMaxLength(50);

                entity.Property(e => e.Locations).IsRequired();

                entity.HasOne(d => d.ServiceType)
                    .WithMany(p => p.Order)
                    .HasForeignKey(d => d.ServiceTypeId)
                    .HasConstraintName("FK_Order_Service");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Order)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_Order_User");
            });

            modelBuilder.Entity<OrderOffer>(entity =>
            {
                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderOffer)
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("FK_OrderOffer_Order");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.OrderOffer)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OrderOffer_User");
            });

            modelBuilder.Entity<Rating>(entity =>
            {
                entity.Property(e => e.Rating1).HasColumnName("Rating");

                entity.HasOne(d => d.RatedUserNavigation)
                    .WithMany(p => p.RatingRatedUserNavigation)
                    .HasForeignKey(d => d.RatedUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Rating_User");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.RatingUser)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Rating_User1");
            });

            modelBuilder.Entity<Report>(entity =>
            {
                entity.HasOne(d => d.ReportedUserNavigation)
                    .WithMany(p => p.ReportReportedUserNavigation)
                    .HasForeignKey(d => d.ReportedUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Report_User1");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.ReportUser)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Report_User");
            });

            modelBuilder.Entity<Service>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<ServiceComponent>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Options).IsRequired();

                entity.HasOne(d => d.Service)
                    .WithMany(p => p.ServiceComponent)
                    .HasForeignKey(d => d.ServiceId)
                    .HasConstraintName("FK_ServiceComponent_Service");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.FullName)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.MobileNumber)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.UserType)
                    .WithMany(p => p.User)
                    .HasForeignKey(d => d.UserTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User_UserType");
            });

            modelBuilder.Entity<UserType>(entity =>
            {
                entity.Property(e => e.TypeName)
                    .IsRequired()
                    .HasMaxLength(50);
            });
        }
    }
}
