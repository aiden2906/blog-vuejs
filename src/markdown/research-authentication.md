# Một bài viết về xác thực người dùng, đâu là phương pháp tốt

## 1. Giới thiệu

- Trước khi đi vào nội dung bài viết, ta sẽ nói sơ qua về HTTP, đại khái thì HTTP là một giao thức cho phép client và server có thể giao tiếp với nhau và nó là một dạng giao thức phi trạng thái. Hãy tưởng tượng rằng khi ta đăng nhập vào trang Facebook và muốn chuyển hướng sang trang setting, ta lại phải đăng nhập lại một lần nữa. Đó là bởi vì HTTP là một giao thức phi trạng thái, nó không lưu giữ trạng thái đăng nhập của chúng ta, nên khi tạo một request để truy cập trang setting, server sẽ không biết được là ta đã đăng nhập hay chưa. Điều này đồng nghĩa với việc request số 1 và số 2 của ta hoàn toàn độc lập với nhau. Như thế thì quá bất tiện cho trải nghiệm người dùng.
- Tuy nhiên, bằng session cookie hoặc JWT gửi theo mỗi request, chúng ta có thể cho server biết rằng chúng ta đã đăng nhập vào trước đó và ta sẽ không cần cần đăng nhập cho các lần sau nữa.

## 2. `Session cookie`

- Session có thể hiểu là một phiên làm việc giữa client và server, nó tồn tại khi bạn mở trình duyệt, truy cập vào trang bạn muốn cho tới khi tắt trình duyệt
- Sau khi đăng nhập xong, tạm gọi là hoàn thành request đầu tiên, server sẽ tạo một session và dữ liệu của session sẽ được lưu trên bộ nhớ của server. Mỗi session thì có một ID riêng, và ID này sẽ được lưu ở cookie trên trình duyệt của người dùng. Và trong mỗi request tiếp theo, browser sẽ gửi kèm cookie theo mỗi request. Server có thể so trùng với session Id trong dữ liệu của mình và xác thực danh tính người dùng. Cho đến khi đăng xuất, toàn bộ session này sẽ bị xóa khỏi bộ nhớ.

- Còn về cookie, có thể hiểu rằng nó là phần dữ liệu được lưu trên máy người dùng, website có thể sử dụng dữ liệu này và thực hiện một số chức năng như xác thực hoặc lưu lại lịch sử giỏ hàng.
- Cookie là một kĩ thuật đáng tin cậy cho website trong việc lưu lại những thông tin hoặc ghi lại hoạt động của trình duyệt người dùng.
  ![](https://i.imgur.com/XjDzYaW.png)

## 3. `Json Web Token`

- Khi nhắc đến token, người ta thường nghĩ ngay đến JWT, một phần là vì nó đã quá rộng rãi và gần như đã trở thành một phương pháp tiêu chuẩn trong việc xác thực người dùng.
- Cũng tương tự như Session-based, sau mỗi lần người dùng đăng nhập, server sẽ sinh ra một token và gửi cho người dùng, đoạn token này sẽ được lưu ở phía người dùng và thường sẽ là localStorage. Trong những lần gửi request tiếp theo, token sẽ được đính kèm trong header để server biết rằng người dùng đã thực hiện xác thực rồi.
- Đối với mỗi request khi đã được đính token, server sẽ làm công việc decode JWT được đính kèm, kiểm tra tính hơp lệ của nó. Khi người dùng đăng xuất, chỉ cần clear token được lưu phía client và không cần tác động gì đến server.

![](https://i.imgur.com/MMFXiWl.png)

- Đã nhắc đến JWT, ta cũng sẽ đi qua một chút về khái niệm của nó. JWT là một tiêu chuẩn RFC 7519, để truyền thông tin giữa các điểm dưới dạng JSON object, nó dùng đễ xác định rằng dữ liệu truyền đi luôn từ một nguồn đáng tin cậy
- Một JWT gồm 3 phần ngăn cách nhau bởi 2 dấu chấm:
  - Header
  - Payload
  - Signature

## 4. Vậy cuối cùng, ta nên chọn phương pháp nào.

- Có thể thấy, phương pháp token authenticationi có một chút nhỉnh hơn so với phương pháp session-based. Phương pháp này cho phép hệ thống dễ dàng mở rộng hơn vì token được lưu ở client, còn session được lưu ở server- tức là sẽ tốn bộ nhớ của server- điều này có thẻ gây ra vấn đề khi mà có rất nhiều người dùng truy cập hệ thống một lúc.
- Hơn nữa, phương pháp session-based sẽ gây ra khó khăn khi chúng ta scale hệ thống theo chiều ngang, tức là đặt thêm một hay nhiều server hoạt động một lúc, khi đó session Id được gửi kèm request có thể được tìm thấy ở server này nhưng không đc tìm thấy ở server khác.
- Tuy nhiên phương pháp token cũng sẽ có một số hạn chế, JWT luôn có kích thước lớn hơn rất nhiều nếu so sánh với session ID vì JWT chứa nhiều thông tin của người dùng hơn. Hãy cẩn trọng việc lưu dữ liệu người dùng JWT, tránh lưu các dữ liệu nhạy cảm
