# Tìm hiều về webhook
## 1. Giới thiệu
- Webhook là một cách cực kỳ hữu hiệu và tương đối dễ dàng, gọn nhẹ trong việc triển khai các phản ứng sự kiện. Các webhook cung cấp một cơ chế trong đó một ứng dụng server-side có thể thông báo cho một ứng dụng phía client-side khi một sự kiện mới đã xảy ra trên máy chủ.
- Trong các API, ứng dụng client-side sẽ gọi ứng dụng server-side để kiểm tra xem dữ liệu mình muốn đã tồn tại hay chưa. Trong khi đó, khi có webhook, phía server-side sẽ gọi webhook(end-point URL được cung cấp bởi ứng dụng client-side). Nó cho phép các ứng dụng cung cấp data cho một ứng dụng khác trong thời gian thực. Webhooks đôi khi còn được gọi là "Reverse APIs", vì trước tiên, bạn cần phải thiết kế API cho webhook sử dụng. Webhook sẽ gửi một HTTP request tới ứng dụng của bạn và vấn đề ở đây là bạn sẽ xử lý nó như thế nào.
- Webhook hoạt động dựa trên khái niệm về phản ứng sự kiện-event reaction. Nhờ vậy mà client-side sẽ không cần phải liên tục hỏi server-side.
- Do đó, thay vì ứng dụng client-side liên tục thăm dò ứng dụng server-side để kiểm tra xem có sự kiện gì mới không thì ứng dụng server-side sẽ gọi ứng dụng client-side bất cứ khi nào server-side có thông tin gì mới để báo cho client-side.
## 2. Đi sâu vào webhook.
- Bước đầu tiên ta cần cung cấp 1 URL để webhook provider gửi request tới. Điều này có nghĩa là ta phải setup một URL cho ứng dụng của mình và có thể sử dụng trên public web (nghĩa là không có xác thực).
- Phần lớn, các webhook sẽ POST data tới URL đã cung cấp theo 1 trong 2 hình thức là JSON hoặc XML. Các nhà cung cấp sẽ cho bạn biết nỗi dung của các API này.
- Vì webhooks cung cấp dữ liệu tới các URL có sẵn công khai trong ứng dụng của bạn, nên có khả năng người khác có thể tìm thấy URL đó và sau đó cung cấp cho bạn dữ liệu sai. Để ngăn chặn điều này xảy ra ta có thể sử dụng một số kĩ thuật. Đầu tiền cần phải yêu cầu các kết nối đến là https
- Cách đầu tiên và được hỗ trợ nhiều nhất để bảo mật webhook là thêm mã thông báo vào URL hoạt động như một nhận dạng duy nhất, ví dụ: ?auth=TK
- Tùy chọn tiếp theo là triển khai Basic Auth, điều này cũng được hỗ trợ rộng rãi và rất dễ thực hiện.
- Hai giải pháp trên đã có thể ngăn chặn được phần lớn các attacks, tuy nhiên điểm bất lợi ở đây là việc gửi auth token cùng với request. Còn một giải pháp nữa là bên phía provider sẽ sign các request gửi tới client và sau đó client-side sẽ verify các signature đấy.
