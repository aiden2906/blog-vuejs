# Tìm hiểu về khái niệm Full-text search
## Lời nói đầu
- Là cách tự nhiên để tìm kiếm thông tin, ta chỉ cần gõ từ khóa và enter, thế là có kết quả trả về
- **Ví dụ**: nếu một bài viết có 3 phần: tiêu đề, các tag, thân bài. Nếu ta không cho search ở phần thân bài (vì một vài lý do như: thân bài thường khá dài, dung lượng lưu trữ không cho phép, ..) thì đó không phải full-text search. Full-text search nghĩa là ta có thể search trên toàn bộ bài viết thay vì chỉ một phần bài viết.
- Bên cạnh full-text search còn có team search. Lấy ví dụ: nếu ta có một văn bản 'I ate Pho yesterday', nếu ta search 'ate' thì đương nhiên sẽ ra kết quả nhưng khi ta search 'eat', nếu nhận được kết quả thì đó là full-text search, còn không sẽ là team search.
- Thông thường team search dùng để search keyword vì thông thường khi search keyword thì ta thường muốn exact match chứ không muốn biến đổi keyword.
- Full-text search thì nâng cao hơn, nó hiểu được rằng 'eat', 'eating', .. đều cùng một nghĩa với 'ate'.
- Nếu chỉ tìm kiếm đơn thuần bằng một câu lệnh query với keyword **LIKE** thì sẽ bị giới hạn tìm kiếm trong một số column cố định, cũng đồng nghĩa với việc match từng row của các column với text tìm kiếm, dó đó độ phức tạp sẽ là tuyến tính. Do đó sẽ nảy sinh 2 vấn đề:
    - Chỉ search được trong các column đã định trước
    - Hiệu năng sẽ không tốt khi database lớn dần
- Do đó, ta sẽ cần một thứ gì đó mềm dẻo hơn, hiệu năng tốt hơn, đó chính là full-text search
    - Về cơ bản thì điều làm FTS khác với các kỹ thuật search thông thường là 'Inverted index'. Đó là kỹ thuật thay vì index như row trong mySql thì ta sẽ tiến hành index theo đơn vị term
    - **Ví dụ:** ta có 3 Document như bên dưới
    ```javascript
    D1 = "This is first document"
    D2 = "This is second one"
    D3 = "one two"
    ```
    - Inverted index của 3 document đó sẽ được lưu dưới dạng như sau:
    ```javascript
    "this" => {D1, D2}
    "is" => {D1, D2}
    "first" => {D1}
    "document" => {D1}
    "second" => {D2}
    "one" => {D2, D3}
    "two" => {D3}
    ```
    - Như vậy, việc search trên database sẽ trở nên nhanh hơn nhiều. Giả sử bạn muốn search 'This is first', thay vì phải scan từng document thì tìm kiếm trên term sẽ trở thành phép union của 3 term trên
    ```javascript
    {D1, D2} union {D1, D2} union {D1} = {D1}
    ```
    - Một điểm lợi nữa là inverted index khá flexible trong việc tìm kiếm, input có thể là 'this is first' hay 'first is this' thì độ phức tạp của phép union vẫn không đổi.

## Ưu điểm của Full-text search:
- Kết quả search trả về nhiều
- Khi đánh index thì tốc độ search nhanh hơn nhiều
- Tối ưu việc sử dụng **LIKE** khi thao rác trên các field text lớn
## Nhược điểm
- Độ chính xác thấp
- Độ nhiễu cao
- Từ đồng nghĩa
