# Tìm hiểu về UploadFile ở Nodejs - Multer
## 1. Giới thiệu
- Multer là một middleware của nodejs, được sử dụng chủ yếu để upload file.
> Lệnh cài đặt : $ npm install --save multer
- Khi người dùng upload file lên server của chúng ta, trình duyệt sẽ tự động mã hóa yêu cầu dưới dạng kiểu multipart/form-data. Multer giúp sử lý dễ dàng một yêu cầu như vậy trên máy chủ

## 2. Phân tích kỹ hơn về Multer
- Cở bản trên client sẽ như sau:
```htmlembedded
<form action="/uploadSingle" method="post" enctype="multipart/form-data">  
      <input type="file" name="name" />
</form>
```
- ++Note++: đừng quên enctypelaf multipart/form-data, nếu không chúng ta sẽ không get được những field name khi submit xuống nodejs.
- Mỗi File sẽ chứa các thông tin cơ bản sau:
    - `fieldname` : tên trườn được chỉ định trong biểu m
    - `originalname` : tên ban đầu của file
    - `encoding` : kiểu mã hóa
    - `mimetype` : kiểu mime của tệp
    - `size` : kích thước theo byte
    - `destination` : thư mục lưu tệp tin (DiskStorage)
    - `filename` : tên của file bên trong destination (DiskStorage)
    - `path` : toàn bộ đường dẫn file đã được upload (DiskStorage)
    - `buffer` : Buffer của toàn bộ file (DiskStorage)

- Multer chấp nhận một đối tượng options, trong đó cơ bản nhất là destination, khai báo cho Multer biết nơi tệp được tải lên. Trong trường hợp bạn bỏ qua đối tượng này, các tệp sẽ được lưu trong bộ nhớ và không bao giờ được ghi lên đĩa.
- Theo mặc định, Multer sẽ đổi tên file để tránh conflict. Và chức năng đó có thể được customize nếu bạn cần
- Sau đây là các options bạn có thể truyền cho Multer:
    - `dest` hoặc `storage`
    - `fileFilter`
    - `limits`
    - `preservePath`

- Thông thường chỉ cần sử dụng dest để chỉ ra nơi file sẽ được lưu trữ, nhưng nếu bạn muốn kiểm soát hơn việc lưu trữ, hãy sử dụng storage. Multer có storage engines DiskStorage và MemoryStorage.

### `DiskStorage`
- DiskStorage cung cấp cho bạn toàn quyền lưu trữ file vào đĩa.
```javascript=
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })
```
- Destination được sử dụng để xác định đâu là nơi file sẽ được lưu trữ, tham số thứ 2 của hàm callback sẽ là nơi lưu trữ. Nếu destination không được cung cấp, thư mục mặc định của hệ điều hành sẽ được thế vào đó.
- Lưu ý là Multer sẽ đảm bảo việc lưu trữ cho bạn. Còn bạn sẽ chịu trách nhiệm đảm bảo thư mục được cung cấp cho destination đã được tạo.
- filename được sử dụng để chỉ định format tên sẽ được lưu bên trong destination. Nếu không có filename, một random name sẽ được sử dụng và không có bất kỳ extension nào.
- Lưu ý là mỗi function đều được truyền cả `req` và `file` để cung cấp thêm thông tin cho việc ra quyết định.

### `MemoryStorage`
- Đối với memoryStorage, files sẽ được lưu trữ trong bộ nhớ dưới dạng Buffer. Và không có bất kỳ options nào.

```javascript=
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })
```

- Khi lưu trữ ở dạng memory, trong thông tin file sẽ chứa field được gọi là buffer chứa toàn bộ file.
- Khi lưu trữ một tệp quá lớn hoặc quá nhiều tệp nhỏ sẽ khiến cho ứng dụng của bạn hết bộ nhớ lưu trữ.

### `limits`
- limit là một đối tượng chỉ định kích thước giới hạn thông qua các thuộc tính tùy chọn.
- Sau đây là các thuộc tính của limits:
    - `fieldNameSize`
    - `fieldSize`
    - `fields`
    - `fileSize`
    - `files`
    - `parts`
    - `headerPairs`

### `fileFilter`
- Cuối cùng là fileFilter, một function có chức năng lọc các file, bỏ qua các file không đạt chuẩn yêu cầu
- Để từ chối một file, sử dụng `cb(null, false)` và để chấp nhận một file `cb(null, true)` hoặc có thể quăng ra một err nếu có gì đó không đúng `cb(new Error('I don\'t have a clue!'))`

## 3. Resize
- Thư viện multer không hỗ trợ việc resize một file hình ảnh được gửi lên server, do đó, ta sẽ cần một thư viện nào đó hỗ trợ công việc này. Và đó sẽ là `sharp`, hỗ trợ chuyển đổi hình ảnh sang các định dạng và kích thước khác nhau.
> Cài đặt: $ npm install sharp
```javascript=
const sharp = require('sharp');
```
### `Callback`
```javascript=
sharp(inputBuffer)
  .resize(320, 240)
  .toFile('output.webp', (err, info) => { ... });
```

### `Promise`
```javascript=
sharp('input.jpg')
  .rotate()
  .resize(200)
  .toBuffer()
  .then( data => { ... })
  .catch( err => { ... });
```

### `Async/await`
```javascript=
const semiTransparentRedPng = await sharp({
  create: {
    width: 48,
    height: 48,
    channels: 4,
    background: { r: 255, g: 0, b: 0, alpha: 0.5 }
  }
})
  .png()
  .toBuffer();
```

### `Stream`
```javascript=
const roundedCorners = Buffer.from(
  '<svg><rect x="0" y="0" width="200" height="200" rx="50" ry="50"/></svg>'
);
 
const roundedCornerResizer =
  sharp()
    .resize(200, 200)
    .composite([{
      input: roundedCorners,
      blend: 'dest-in'
    }])
    .png();
 
readableStream
  .pipe(roundedCornerResizer)
  .pipe(writableStream);
```

> Link API document: https://sharp.pixelplumbing.com/api-constructor