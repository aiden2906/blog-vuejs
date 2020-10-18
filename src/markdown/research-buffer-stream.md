# Tìm hiểu về Buffer, Stream

## 1. Giới thiệu

- Buffer là một vùng dữ liệu tạm thời chứa các dữ liệu đang được chuyển từ nơi này đến nơi khác. Buffer có kích thước xác định và giới hạn. Kích thước của buffer được xác định bằng những thuật toán cho từng trường hợp cụ thể. Buffer là một kỹ thuật được phát triển nhằm ngăn chặn sự tắt nghẽn dữ liệu khi truyền từ nơi này đến nơi khác.
- Stream là một chuỗi dữ liệu sẵn có qua thời gian, hay có thể hình dùng stream là một đối tượng chứa dữ liệu được truyền từ nơi này đến nơi khác.
- Trong thực tế, khi chúng ta xem một đoạn phim trên mạng, nếu đường truyền mạng chúng ta đủ mạnh thì tốc độ stream video sẽ kịp thời làm đầy các buffer (vùng nhớ tạm trên RAM) và đoạn dữ liệu này sẽ được gửi đến trình media player để chạy đoạn dữ liệu vừa được làm đầy trong buffer. Trong lúc phát nội dung đó, buffer sẽ trống và lại được làm đầy.
- Đôi khi chúng ta đang xem phim sẽ gặp các trường hợp loading hay buffering. Đó là khi đường truyền mạng quá yếu, không đủ tốc độ để làm đầy buffer. Khi buffer chưa đầy, nó sẽ không gửi dữ liệu đến trình media để xử lý và ta sẽ phải chờ cho đến khi buffer đầy và đẩy dữ liệu đến trình phát video.

## 2. `Buffer`

- Buffer là một class trong NodeJS API dùng để giao tiếp với dữ liệu nhị phân. Buffer class đã được khai báo trong phạm vi global trong các phiên bản của Nodejs. Do đó, chúng ta không cần phải require buffer để có thể sử dụng.

```javascript=
const buf1 = Buffer.alloc(10); //Tạo một Buffer với kích thước là 10.
buf1.write('Hello Nodejs Buffer'); //Ghi dữ liệu vào buffer. Kết quả của buf1 là "Hello Node", vì buf1 chỉ có kích thước là 10.
const buf2 = Buffer.from('Welcome to Buffer'); //Tạo buffer từ nội dung nào đó. Mặc định, bảng mã xử lý sẽ là utf8 khi chúng ta không chỉ rõ bảng mã.
const buf3 = Buffer.from('Welcome to Buffer', 'ascii'); //Tạo buffer từ nội dung với bảng mã xử lý là ascii
console.log(buf2.toString()); //Để đọc được dữ liệu buffer chúng ta chuyển về dạng string sử dụng hàm toString() với encoding mặc định là utf8
// kết quả là: Welcome to Buffer
console.log(buf2.toString('hex')); //đọc nội dung của buf2 với bảng mã hex --> kết quả: 57656c636f6d6520746f20427566666572
console.log(buf2.length); //độ dài của buf2 --> kết quả: 17
```

## 3. `Stream`

- Stream là một lớp trừu tượng để làm việc với luồng dữ liệu trong Nodejs. Có rất nhiều đối tượng kế thừa từ lớp Stream trong Nodejs như một request đến một máy chủ HTTP, hay việc đọc ghi file,...Các đối tượng Stream này đều có khả năng đọc hoặc ghi hoặc cả hai. Và tất cả Stream đều kế thừa từ eventEmitter.
- Không giống buffer, để sử dụng được Stream, chúng ta phải require nó.

```javascript=
app.js;

var fs = require('fs'); //là một đối tượng kế thừa lớp Stream
var fsReadable = fs.createReadStream(__dirname + '/readme.txt'); //tạo luồng dữ liệu đọc được từ file readme.txt
fsReadable.on('data', function(chunk) {
  console.log(chunk.length);
}); //vì fsReadable là một instance của fs,và mọi stream đều là một thể hiện của EventEmitter nên nó có thể sử dụng các phương thức của EventEmitter.
// kết quả là 64379 bytes đúng bằng kích thước của file readme.txt

var fsReadable2 = fs.createReadStream(__dirname + '/readme.txt', {
  enconding: 'utf8',
  highWaterMark: 32 * 1024,
}); //với các tùy chọn trong createReadStream như bộ mã hóa (encoding), highWaterMark để xử lý dữ liệu trên từng mảnh có kích thước xác định
// ở đây kích thước xử lý trên từng mảnh là 32 kb.
fsReadable2.on('data', function(chunk) {
  console.log(chunk.length);
}); //Cho ra kết quả là: 32768 31611 --> một mảnh dữ liệu tối đa được xử lý là 32kb.

var fsWritable = fs.createWriteStream(__dirname + '/readmecopy.txt'); //tạo luồng dữ liệu có thể ghi được, đích là file readmecopy.txt
fsReadable2.on('data', function(chunk) {
  fsWritable.write(chunk);
}); //thực hiện ghi (sao chép) từng mảnh dữ liệu từ file readme.txt vào file readmecopy.txt.
```
