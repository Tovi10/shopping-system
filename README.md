# מערכת קניות Full Stack

מערכת קניות מלאה הכוללת קטלוג מוצרים, עגלת קניות דינמית ותהליך ניהול ושליחת הזמנות.

---

## 🛠️ טכנולוגיות

* **Client:** React, TypeScript, Redux Toolkit, RTK Query, Vite
* **Products API:** .NET 10, Entity Framework Core, SQL Server
* **Orders API:** Node.js, Express, TypeScript, MongoDB

---

## 📁 מבנה הפרויקט

shopping-system/
├── client/
├── products-api/
├── orders-api/
└── README.md

---

## 📋 דרישות מקדימות

ודאו שהכלים הבאים מותקנים על המחשב:
* Node.js + npm
* .NET 10 SDK
* SQL Server
* MongoDB / MongoDB Atlas

---

## 🚀 הורדת הפרויקט והפעלה

יש לשכפל את המאגר ולהפעיל את כל אחד משלושת הרכיבים בנפרד (בטרמינלים נפרדים):

### 1. שרת המוצרים (Products API)
cd products-api
dotnet restore
dotnet ef database update
dotnet run

השרת ירוץ בכתובת: http://localhost:5016

### 2. שרת ההזמנות (Orders API)
צרו קובץ בשם `.env` בתיקיית `orders-api/` והוסיפו את התוכן הבא:

MONGODB_URI=your_mongodb_connection_string
PORT=4000

לאחר מכן הריצו:
cd orders-api
npm install
npm run dev

השרת ירוץ בכתובת: http://localhost:4000

### 3. צד לקוח (Client)
cd client
npm install
npm run dev

האפליקציה תפתח בכתובת: http://localhost:5173

---

## 💡 שימוש במערכת

1. בחירת קטגוריה וצפייה במוצרים.
2. הוספת מוצרים לעגלה.
3. שינוי כמויות או הסרת מוצרים.
4. מעבר למסך ההזמנה.
5. מילוי פרטי הלקוח.
6. אישור ושליחת ההזמנה.
7. ההזמנה נשמרת ב-MongoDB ומתקבל מספר הזמנה.

---

## 🔌 API

### Products API
GET /api/categories
GET /api/products
GET /api/products?categoryId={id}

### Orders API
POST /api/orders

---

## 🧪 בדיקת תקינות

# Client
npm run build

# Orders API
npx tsc --noEmit

# Products API
dotnet build
