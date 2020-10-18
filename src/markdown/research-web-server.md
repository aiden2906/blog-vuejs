# Tìm hiểu về Web server
## 1. Khái niệm web server.
- Có thể hiểu webserver được cấu thành từ 2 phần
    - Phần cứng: đơn giản chỉ là một cái máy tính y như cái máy thông thường bạn dùng, có thể chỉ hơn ở chỗ nó cần mạnh mẽ hơn và chứa các files thành phần của trang web như ảnh, html, css, js,... Và nó sẽ chịu trách nhiệm gửi các file đó đến client khi họ yêu cầu. Và để có thể giao tiếp với cái máy tính khỏe đó, ta cần một domain ví dụ như google.com hay facebook.com chẳng hạn.
    - Phần mềm: Chiếc máy tính cần được cài đặt những chương trình giúp điều khiển việc truy cập các files như trên, tôi hiểu ở đây là HTTP web server. Hai phần mềm webserver phổ biến nhất hiện nay là Apache và Nginx, ngoài ra còn có nhiều phần mềm hỗ trợ như Unicorn, IIS, Node.js...Và về tổng quan, các phần mềm này phục vụ việc trao đổi các nội dung, files của trang web thông qua giao thức HTTP. Những nội dung đó có thể là static hoặc dynamic, tùy theo nội dung mà chúng ta có thể phân loại static hay dynamic website.
    ![](https://i.imgur.com/qD3EuCP.png)
    - Web server hoạt động như nào? Để tải được trang web vể trình duyệt, bước đầu tiên đương nhiên là bạn bật trình duyệt lên và gõ địa chỉ vào rồi ... trình duyệt sẽ kết nối tới web server, gửi đi yêu cầu và nhận về nội dung trang web.
    - Địa chỉ của một trang web bao gồm 3 phần:
        - Tên giao thức : http
        - Tên miền máy chủ web : https://viblo.asia
        - Tên tệp HTML : 'xxx.html'
        - Trình duyệt sẽ liên hệ với máy chủ tên miền DNS server để chuyển đổi tên miền ra địa chỉ IP tương ứng. DNS giống như danh bạ internet, bạn không cần nhớ địa chỉ IP của website. DNS server sẽ giúp bạn làm điều đó. Khi đã có được địa chỉ IP, trình duyệt sẽ gửi tiếp một kết nối tới máy chủ của website có địa chỉ này qua port 80. Khi đã thiết lập kết nối, trình duyệt sẽ yêu cầu một file xxx.html và server sẽ đáp ứng điều đó.