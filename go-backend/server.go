package main

import (
	"math/rand"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type Item struct {
	ID           int       `json:"id"`
	Num          int       `json:"num"`
	Layer        int       `json:"layer"`
	Height       float64   `json:"height"`
	Width        float64   `json:"width"`
	XAxis        float64   `json:"x_axis"`
	YAxis        float64   `json:"y_axis"`
	BorderWeight float64   `json:"border_weight"`
	BorderColor  string    `json:"border_color"`
	BorderRadius float64   `json:"border_radius"`
	FontSize     int       `json:"font_size"`
	FontWeight   int       `json:"font_weight"`
	Note         string    `json:"note"`
	CreatedAt    time.Time `json:"created_at"`
}

func GraphicController(c echo.Context) error {
	for i := 0; i < 10000; i++ {
		numRandom := rand.Intn(11) + 1
		layerRandom := rand.Intn(101)
		heightRandom := rand.Intn(290) + 10
		widthRandom := rand.Intn(290) + 10
		XAxisRandom := rand.Intn(98) + 1
		YAxisRandom := rand.Intn(98) + 1
		BorderWeightRandom := rand.Intn(20) + 1
		BorderColorR := rand.Intn(256)
		BorderColorG := rand.Intn(256)
		BorderColorB := rand.Intn(256)
		BorderColorRandom := []string{strconv.Itoa(BorderColorR), strconv.Itoa(BorderColorG), strconv.Itoa(BorderColorB)}
		BorderRadiusRandom := rand.Intn(101)
		FontSizeRandom := rand.Intn(2) + 40
		fontWeight := []string{"100", "200", "300", "400", "500", "600", "700", "800", "900"}
		FontWeightRandom := rand.Intn(len(fontWeight))
		graphic := models.Graphic{
			Num:          strconv.Itoa(numRandom),
			Layer:        strconv.Itoa(layerRandom),
			Height:       strconv.Itoa(heightRandom),
			Width:        strconv.Itoa(widthRandom),
			XAxis:        strconv.Itoa(XAxisRandom),
			YAxis:        strconv.Itoa(YAxisRandom),
			BorderWeight: strconv.Itoa(BorderWeightRandom),
			BorderColor:  BorderColorRandom,
			BorderRadius: strconv.Itoa(BorderRadiusRandom),
			FontSize:     strconv.Itoa(FontSizeRandom),
			FontWeight:   fontWeight[FontWeightRandom],
		}
		initializers.AddToDB(graphic)
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"status":  "success",
		"message": "Created",
	})
}

func main() {
	e := echo.New()
	e.Use(middleware.CORS())
	e.GET("/", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "Hello, World!")
	})

	// Endpoint สำหรับเข้าถึงไฟล์รูปภาพ
	e.GET("/images/:name", func(c echo.Context) error {
		name := c.Param("name")
		// เปิดไฟล์รูปภาพ
		file, err := os.Open("images/" + name)
		if err != nil {
			return err
		}
		defer file.Close()

		// ค้นหา Content-Type ของไฟล์
		contentType := http.DetectContentType([]byte(name))
		// ส่งค่า Content-Type ของไฟล์
		c.Response().Header().Set("Content-Type", contentType)

		// ส่งไฟล์รูปภาพกลับไปยัง client
		return c.File("images/" + name)
	})

	// สร้างเส้นทาง API สำหรับรับข้อมูลลิงก์ภาพ
	e.GET("/api/images", func(c echo.Context) error {
		// ดึงรายชื่อไฟล์ทั้งหมดในโฟลเดอร์ images
		files, err := filepath.Glob("images/*")
		if err != nil {
			return err
		}

		// สร้าง slice เพื่อเก็บลิงก์ภาพ
		var imageLinks []string
		for _, file := range files {
			// สร้าง URL สำหรับภาพแต่ละภาพ
			imageURL := "http://localhost:1323/" + file
			imageLinks = append(imageLinks, imageURL)
		}

		// ส่งข้อมูลลิงก์ภาพกลับไปยัง client
		return c.JSON(http.StatusOK, imageLinks)
	})

	// เส้นทาง API สำหรับส่งข้อมูล item ทั้งหมด
	e.GET("/api/items", func(c echo.Context) error {
		// สร้างข้อมูล item
		var items []Item
		// สร้างข้อมูล item จำนวน 100 รายการ
		for i := 1; i <= 100; i++ {
			item := Item{
				ID:           i,
				Num:          i * 10,
				Layer:        i,
				Height:       float64(i * 5),
				Width:        float64(i * 6),
				XAxis:        float64(i * 7),
				YAxis:        float64(i * 8),
				BorderWeight: float64(i) / 10,
				BorderColor:  "black",
				BorderRadius: float64(i) * 2,
				FontSize:     i * 3,
				FontWeight:   i * 4,
				Note:         "Note " + string(i),
				CreatedAt:    time.Now(),
			}
			items = append(items, item)
		}
		// ส่งข้อมูล item กลับไปให้ client ในรูปแบบ JSON
		return c.JSON(http.StatusOK, items)
	})

	// เส้นทาง API สำหรับส่งข้อมูล item ทั้งหมด
	e.GET("/api/items1", func(c echo.Context) error {
		// สร้างข้อมูล item
		var items []Item
		// สร้างข้อมูล item จำนวน 100 รายการ
		for i := 1; i <= 100; i++ {
			item := Item{
				ID:           i,
				Num:          i * 10,
				Layer:        i,
				Height:       float64(i * 5),
				Width:        float64(i * 6),
				XAxis:        float64(i * 7),
				YAxis:        float64(i * 8),
				BorderWeight: float64(i) / 10,
				BorderColor:  "black",
				BorderRadius: float64(i) * 2,
				FontSize:     i * 3,
				FontWeight:   i * 4,
				Note:         "Note " + string(i),
				CreatedAt:    time.Now(),
			}
			items = append(items, item)
		}
		// ส่งข้อมูล item กลับไปให้ client ในรูปแบบ JSON
		return c.JSON(http.StatusOK, items)
	})

	e.GET("api/graphic", GraphicController)

	e.Logger.Fatal(e.Start(":1323"))

}
