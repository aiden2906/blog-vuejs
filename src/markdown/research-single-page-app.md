# Single Page Application ???
## 1. Giới thiệu
- Hiện nay, Single Page Application đã trở nên phổ biến và phát triển cực kỳ mạnh mẽ. Trước tiên, mình sẽ kiểm tra em SPA nó khác gì so với các website truyền thống.

![](https://i.imgur.com/3S8Sqm5.png)

- Nói đơn giản, SPA có một trang gốc và trong trang gốc đó, chúng ta có thể tải nhiều trang con mà không gây bất kỳ ảnh hưởng gì tới trang gốc. SPA chỉ load phần cần thiết, khác với các ứng dụng truyền thống (chúng tải lại toàn bộ trang) khi chúng ta tương tác với trang web( như thực hiện việc điều hướng). Trong một SPA chúng ta chỉ việc load các thành phần chung một lần duy nhất, các thành phần chung này thường xuất hiện ở nhiều trang của ứng dụng. Ví dụ khi bạn đang ở trang chủ thì sẽ có header, footer là thành phần chung, sau đó, ta chuyển hướng sang trang Giới thiệu chẳng hạn, thì ta chỉ cần load lại phần nội dung của trang giới thiệu, còn header và footer giữ nguyên.
- SPA chủ yếu sử dụng Ajax-để giao tiếp với backend server mà không phải tải lại toàn bộ trang và lấy dữ liệu được trả về từ server để update ở phía client. Do đó, việc render sẽ do client đảm nhiệm, chứ không phải do backend server như đối với JSP, PHP,...

## 2. Ưu điểm của SPA
- Việc render html ở server là một điều đáng quan tâm nếu trang web của bạn có nhiều người dùng, vì nó cực kỳ tốn tài nguyên hệ thống. Với SPA, điều này chỉ xảy ra khi bạn gửi request lần đầu để yêu cầu toàn bộ tài nguyên JS, sau đó, việc render sẽ do client đảm nhiệm. Từ đó, ta sẽ chuyển từ việc server phải render 1000 request từ 1000 client thành 1000 client sẽ làm việc render thứ chúng cần
- SPA tách biệt frontend và backend ra, SPA giao tiếp với server chủ yếu qua JSON REST API, giúp cho dữ liệu gửi và trả về giữa client và server được giảm đến mức tối thiểu. Việc phát triển, kiểm thử cũng có thể độc lập giữa frontend và backend
- SPA rất nhanh, vì các tài nguyên tĩnh HTML, CSS, Script chỉ được tải một lần duy nhất. Trong suốt quá trình sử dụng, chỉ có dữ liệu được chuyển qua lại giữa client và server giúp giảm thiểu băng thông cho server
- Tăng trải nghiệm ngời dùng

## 3. Nhược điểm của SPA.
- Bên cạnh đó, SPA cũng có những nhược điểm nhất định
- Người dùng phải cho phép JS hoạt động trên trình duyệt, nếu không SPA sẽ không hoạt động
- Trình duyệt sẽ lo việc xử lý dữ liệu từ server và render ra html nên vấn đề hiệu năng trên các thiết bị tầm trung trở xuống sẽ là trở ngại khá lớn
- Việc phát triển SPA sẽ phức tạp hơn rất nhiều so với ứng dụng web truyền thống. Backend Dev cần phải biết JS cũng như biết các sử dụng một trong những framework dùng để phát triển SPA như ReactJS, AngularJS,... Và việc viết unit test cho JS cũng có nhiều khó khăn hơn.
- Ngày nay, việc các SPA framework xuất hiện có lẽ đã nhận được rất nhiều sự chú ý của thế giới Javascript. Nó mang lại nhiều lợi ích cho trải nghiệm người dùng, tuy nhiên, nó có một vấn đề là ứng dụng cần được đánh indexed bởi search engine. Nhiều search engine và mạng xã hội như FB, Twetter mong đợi plain HTML để sử dụng các thể meta cũng như nội dung liên quan cho việc search. Chúng không thể chờ cho đến khi các JS framework hoàn thành công việc dựng xong trang. Hay nói một cách khác, SPA chống lại các search engine.
