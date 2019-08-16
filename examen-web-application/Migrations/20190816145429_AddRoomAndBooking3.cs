using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace examen_web_application.Migrations
{
    public partial class AddRoomAndBooking3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RoomNumber",
                table: "Booking");

            migrationBuilder.RenameColumn(
                name: "Roomtype",
                table: "Room",
                newName: "RoomTypeID");

            migrationBuilder.AddColumn<DateTime>(
                name: "AddedOn",
                table: "Room",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "RoomNo",
                table: "Room",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedOn",
                table: "Room",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "RoomType",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoomType", x => x.ID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Room_RoomTypeID",
                table: "Room",
                column: "RoomTypeID");

            migrationBuilder.AddForeignKey(
                name: "FK_Room_RoomType_RoomTypeID",
                table: "Room",
                column: "RoomTypeID",
                principalTable: "RoomType",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Room_RoomType_RoomTypeID",
                table: "Room");

            migrationBuilder.DropTable(
                name: "RoomType");

            migrationBuilder.DropIndex(
                name: "IX_Room_RoomTypeID",
                table: "Room");

            migrationBuilder.DropColumn(
                name: "AddedOn",
                table: "Room");

            migrationBuilder.DropColumn(
                name: "RoomNo",
                table: "Room");

            migrationBuilder.DropColumn(
                name: "UpdatedOn",
                table: "Room");

            migrationBuilder.RenameColumn(
                name: "RoomTypeID",
                table: "Room",
                newName: "Roomtype");

            migrationBuilder.AddColumn<string>(
                name: "RoomNumber",
                table: "Booking",
                nullable: true);
        }
    }
}
