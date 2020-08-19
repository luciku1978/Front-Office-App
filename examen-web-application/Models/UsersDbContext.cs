using Microsoft.EntityFrameworkCore;

namespace examen_web_application.Models
{
    public class UsersDbContext : DbContext
    {
        public UsersDbContext(DbContextOptions<UsersDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>(entity => {
                entity.HasIndex(u => u.Username).IsUnique();
            });
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Room> Room { get; set; }
        public DbSet<RoomType> RoomType{ get; set; }
        public DbSet<Booking> Booking { get; set; }
        public DbSet<Permission> Permission { get; set; }
        public DbSet<UserPermission> UserPermission { get; set; }
    }
}

