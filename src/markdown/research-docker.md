# Tìm hiểu về docker
## 1. Giới thiệu
---
- Có một kịch bản mà tôi muốn các bạn nghĩ tới, đó là lúc chúng ta phát triển ứng dụng trên môi trường phát triển, mục tiêu cuối cùng của chúng ta là release sản phẩm, chạy mượt mà trên môi trường production, nhưng sẽ có một vấn đề nảy sinh là một trường phát triển thực sự khác với môi trường testing và thực sự khác với môi trường production, khi đó, ta lấy gì để đảm bảo một ứng dụng chạy mượt mà trên một trường dev có thể chạy ngon lành cành đào trên môi trường production.
- Và đó là lý do docker ra đời và giúp ta giải quyết bài toán đó. Vậy docker là gì?
    - Docker là một nền tảng mở cho phát triển, vận chuyển và chạy ứng dụng
    - Cho phép bạn tách ứng dụng ra khỏi cơ sở hạ tầng của mình để có thể cung cấp phần mềm một cách nhanh chóng
    - Với docker, bạn có thể quản lý cơ sở hạ tầng theo cùng cách quản lý ứng dụng của mình

- Docker giúp bạn phân phối ứng dụng một cách nhanh chóng vì container rất lý tưởng cho việc tích hợp liên tục và quá trình phát triển liên tục (CI/CD)
    - Developer viết code trên máy local và chia sẽ công việc của họ với đồng nghiệp bằng cách sử dụng các container Docker.
    - Họ sử dụng Docker để đẩy ứng dụng của họ vào môi trường thử nghiệm và thực hiện bài kiểm tra tự động hoặc thủ công
    - Khi sản phẩm có lỗi, dev có thể trở về môi trường phát triển và fix, sau đó deploy lại lên môi trường thử nghiệm để test
    - Khi thử nghiệm hoàn tất, việc deploy cho khách hàng đơn giản chỉ cần đẩy image được cập nhật lên môi trường production.
---
## 2. Docker Platform
Docker cung cấp khả năng đóng gói và chạy một ứng dụng trong một môi trường lỏng lẻo gọi là container. Docker giúp cách ly và bảo mật, cho phép bạn chạy nhiều containers đồng thời trên một máy chủ nhất định. Các container là lightweight và chúng không cần tải thêm một hypervisor, chạy trực tiếp trên kernel của máy chủ. Điều này có nghĩa là bạn có thể chạy nhiều contains hơn trên một kết hợp phần cứng nhất định hơn là nếu bạn đang sử dụng các máy ảo. Bạn thậm chí có thể chạy các container docker trong máy chủ lưu trữ mà thực sự là các máy ảo.

## 3. Docker Engine.
- Là một công cụ client-server hỗ trợ công nghệ container để xử lý các nhiệm vụ và quy trình công việc liên quan đến việc xây dụng các ứng dụng dựa trên vùng chứa là container. Engine tạo ra một quy trình daemon phía máy chủ lưu trữ images, containers, networks và storage volumes. Daemon cũng cung cấp giao diện dòng lệnh phía máy khách cho phép người dùng tương tác với daemon thông qua giao diện lập trình ứng dụng docker.
- Vậy 4 đối tượng ta vừa nhắc đến là gì? Đó chính là 4 đối tượng của Engine và chúng đều có ID để xác định. Và bằng một cách nào đó, chúng phối hợp với nhau để chúng ta có thể build, ship và run application ở bất cứ đâu
    - `Image`: là một read-only template, là thành phần để đóng gói ứng dụng và các thành phần mà ứng dụng phụ thuộc vào để tạo thành một Docker container. Thông thường, một image có thể được xây dựng dựa trên image khác với một số tùy chỉnh bổ sung. Để xây dựng một image, bạn cần tạo một dockerfile định nghĩa các bước cần thiết để tạo một image, mỗi hướng dẫ trong dockerfile tạo ra một layer trong image. Khi thay đổi dockerfile để rebuild image, chỉ những layer có thay đổi mới được rebuild, đó là lý do làm cho image thì nhỏ, nhẹ và nhanh khi so sánh với các công nghệ ảo hóa khác. Và image được lưu trữ ở trên local hoặc trên một registry (là nơi lưu trữ và cung cấp kho chứa các image). Image thực ra là một layer trong file systems chồng lên những images khác.
    - `Containers`: là một instance tại thời điểm runtime của image, và nó hoạt động như một thư mục, chứa tất cả những gì cần thiết để chạy một ứng dụng. Bạn có thể create, run, stop, delete or move một container sử dụng Docker API hoặc CLI. Ngoài ra, bạn có thể kết nối 1 hoặc nhiều network, lưu trữ nó, hoặc thậm chí tạo ra một image mới dựa trên trạng thái của nó. Docker container được tạo dựa trên image và những cấu hình bạn cung cấp cho nó lúc khởi tạo.
    - `Network`: cung cấp một private network chỉ tồn tại giữa container và host
    - `Volume`: được dùng để chia sẽ dữ liệu cho các container. Mặc dù các docker container chạy độc lập với nhau, nhưng vì một lý do nào đó, bạn sẽ muốn share data giữa chúng, ví dụ share các file config hoặc các file html tĩnh. Docker volume được dùng với mục đích mount volumn đó vào các container hay nói dễ hiểu hơn là docker sẽ dùng volumn để thay thế cho một folder nào đó trong container.

![](https://i.imgur.com/qczo4SC.png)

## 4. Distribution tools
- là các công cụ phân tán giúp chúng ta lưu trữ và quản lý các Docker Images như: Docker registry, Docker Trusted Registry, Docker Hub,...
- `Docker Hub`: là một công cụ phần mềm như một dịch vụ cho phép người dùng public hay private các image của chúng ta. Dịch vụ cung cấp hơn 100.000 ứng dụng có sẵn công khai, cũng như các cơ quan đăng ký container công cộng và tư nhân
- `Docker Machine`: Machine tạo ra Docker Engine trên laptop của bạn hoặc trên bất cứ dịch vụ cloud phổ biến nào như AWS, Azure, Google Cloud, hoặc trên hệ thống data center như VMWare, OpenStack. Docker Machine sẽ tạo ra các máy ảo và cài đặt Docker Engine lên chúng và cuối cùng nó sẽ cấu hình Docker Client để giao tiếp với Docker Engine một cách bảo mật
- `Docker Compose`: là một công cụ giúp định nghĩa và khởi chạy multi-container Docker applications.
- `Docker Swarm`: là một công cụ giúp chúng ta tạo ra một clustering Docker. Nó giúp chúng ta gom nhiều Docker Engine lại với nhau và ta có thể nhìn nó như duy nhất một virtual Docker Engine.
- `Dockerfile`: như một script dùng để build các image trong container. Dockerfile bao gồm các câu lệnh liên tiếp nhau được thực hiện tự động trên một image gốc để tạo ra một image mới. Dockerfile giúp đơn giản hóa tiến trình từ lúc bắt đầu đến lúc kết thúc.
- `Docker Toolbox`: Bởi vì Docker Engine dùng một số feature của kernel Linux nên ta sẽ không thể chạy Docker Engine natively tren windows hay BSD được. Ở các phiên bản trước đây thì ta sẽ cần một máy ảo cài một phiên bản linux nào đó và sau đó cài Docker Engine lên máy ảo đó

## 5. Dockerfile
- Có nhiều cách để có được một docker image, ví dụ như bạn sẽ tìm đến các registry để pull một số image có sẳn về sử dụng. Ngoài cách sử dụng registry,thì cách tiếp cận Dockerfile sẽ giúp bạn tự định nghĩa một docker image của riêng bạn, Dockerfile là một file text đơn giản chứa các command mà một người dùng có thể dùng để tạo ra một image và docker có thể tự động build một image tự động bằng cách đọc hướng dẫn từ Dockerfile.


## 6. Docker Compose
- Đó là một công cụ dùng để định nghĩa và run multi-container cho Docker application. Với compose bạn sử dụng file YAML để config các services cho application của bạn. Sau đó dùng command để create và run những config đó.
- Để sử dụng docker compose cũng khá đơn giản
    - Khai báo app's environment trong Dockerfile
    - Khai báo các services cần thiết để chạy application trong file docker-compose.yml
    - Run docker-compose up để start và run app

- Không giống như Dockerfile(để build các image). Docker compose dùng để build và run nhiều container một lúc. Các thao tác của docker-compose tương tự như lệnh docker run
- Docker compose cho phép tạo nhiều service giống nhau bằng lệnh

```
docker-compose scale <service_name> = <số lượng>
```
- Ví dụ, config các service cần start và run trong file docker-compose.yml

```dockerfile=
version: '2.1'

services:
  webreactjs:
    image: af1205224676
    build: .
    ports:
      - 3000:3000
    restart: always
  servergo:
    image: cef5deda0834
    build: .
    ports:
      - 8080:8080
    restart: always
```
- Trong đó:
    - `version`: chỉ ra phiên bản docker-compose được sử dụng
    - `services`: thiết lập các services muốn cài đặt và chạy
    - `image`: chỉ ra image được sử dụng lúc tạo ra container
    - `build`: dùng để tạo container
    - `port`: thiết lập port chạy tại máy host và trong container
    - `restart`: tự động khởi chạy khi container bị tắt

- Ngoài ra còn một số lẹnh config khác như:
    - `environment`: thiết lập biến môi trường
    - `depends_on`: chỉ ra sự phụ thuộc. Tức là services nào phải đc cài đặt và chạy trước thì service được config tại đó mới được chạy.
    - `volumes`: dùng để mount hai thư mục trên host và container với nhau.

- Sau khi đã có file docker-compose.yml, ta cần validate nó bằng cmd:`docker-compose config`

- Và cuối cùng, ta sẽ run command như sau: 
```
docker compose up -d
```
- Khi run xong, chúng ta thấy docker-compose đã start và run hai service mà chúng ta đã config trong file dockercompose.yml

## 7. Docker Volume
- `Volume` trong docker được sử dụng để chia sẽ dữ liệu cho container. Ta sẽ dùng docker volume khi muốn gắn một thư mục nào đó của host với container, chia sẽ dữ liệu của host với container, chia sẽ dữ liệu giữa các container hoặc backup, restore volume.

## 8. Docker Swarm
- Trong quá trình phát triển, quản lý, scale cũng như deploy project của bạn với việc dùng lệnh của docker để deploy thì ban đầu project nhỏ chỉ cần chạy một host nên không có vấn đề gì cả. Tuy nhiên khi project đó vì một số yêu cầu hoặc lý do gì đó phải cần thêm nhiều host hoặc rất nhiều host. Lúc này bạn khó có thể quản lý, scale và cũng không thể nào dùng lệnh để đi deploy từng con host lên vì nó khá vất vả. Biết được nỗi lòng đó, Docker đã phát triển thêm cho tái cái gọi là docker swarm.
- Docker swarm là một công cụ cho phép ta gom một số docker host lại với nhau thành dạng cụm và ta có xem nó như một máy chủ Docker ảo duy nhất. Và một swarm là một cluster của một hoặc nhiều docker engine đang chạy. Và swarm mode cung cấp cho ta các tính năng để quản lý và điều phối cluster.


## 8. Docker logs
- Khi thao tác với container và nhìn vào đầu ra của một container khi nó chạy xong là điều không dễ chịu, khi bạn chạy một container và nó gặp lỗi thì bạn sẽ muốn tìm hiều xem chuyện gì xảy ra, lệnh docker logs sẽ giúp ta điều đó.
- Ta sẽ dùng lệnh `docker logs container_name` để xem output của container miễn là container đó vẫn tồn tại.

## 8. Phân biệt virtualization và containerization.
Có 2 cách tiếp cận để cải thiện khả năng mở rộng, giảm chi phí và chuẩn hóa việc triển khai phần mềm trên nhiều máy và nền tảng, đó là containers và virtual machines. Cả 2 trong số chúng đều tạo ra các virtual package những chúng khác nhau về cách hoạt động, đặc điểm và trường hợp sử dụng
#### 8.1 `Virtualization`
-  Trước khi có container, VMs là một lựa chọn công nghệ để tối ưu hóa dung lượng máy chủ. Nó cho phép chạy những gì chạy trên nhiều máy tính với nhiều hệ điều hành khác nhau trên một phần cứng của máy chủ vật lý.
-  Virtualization là không thể nếu không có hypervisor. Một hypervisor là phần mềm hoặc lớp cơ sở cho phép nhiều hệ điều hành chạy song song, và tất cả chúng đều có thể truy cập vào tài nguyên của cùng một máy chủ vật lý. Hypervisor phối hợp và phân tách tài nguyên, chia một phần cho mỗi máy ảo khi cần.
-  Mỗi máy ảo trông như một data folder, nghĩa là bạn có thể di chuyển và copy dễ dàng như đối vưới một thư mục. Nhưng nó cũng có một số hạn chế
    -  Mỗi máy ảo sẽ có hệ điều hành riêng của nó và nó không sử dụng hệ điều hành của máy chủ nhưng nó sẽ yêu cầu một số tài nguyên như RAM, CPU và bộ nhớ.
    -  Tài nguyên được cung cấp cho mỗi VMs là cố định và nó không thể thay đổi theo nhu cầu của ứng dụng phát triển

#### 8.2 `Containerization`

- Còn đối với containerization, chúng ta sẽ có một container engine và không cần một hệ điều hành riêng biệt cho chúng. Thay vào đó, chúng ta sẽ có một container chứa ứng dụng và tất cả dependence của chúng và nó sẽ sử dụng hệ điều hành của máy chủ. Mặt khác, bộ nhớ và các tài nguyên mà container cần thì không cố định, nó có thể lấy mỗi khi nó cần. Do đó nó rất nhẹ và nhanh.
- Trường hợp nếu bạn muốn run một ứng window trên hệ điều hành linux, bạn cần một VM có hệ điều hành window.

![](https://i.imgur.com/0E0YhLQ.png)

- Trong trường hợp container engine là docker engine. Docker sử dụng một kiến trúc client-server. Docker client sẽ nói chuyển với docker daemon để thực hiện các công việc nặng như running, building hoặc phân phối docker container của bạn. Docker client và docker daemon có thể run trên cùng một hệ thống hoặc bạn cũng có thể connect docker client tới một docker daemon từ xa. Docker client và daemon giao tiếp với nhau bằng REST API, thông qua UNIX socket hoặc giao diện mạng.
- Docker daemon sẽ lắng nghe các request API và quản lý các docker object như image, container, network và volume. Daemon cũng có thể giao tiếp với daemon khác để quản lý docker Service.
- Docker client là cách chính để user tương tác với docker. Khi bạn sử dụng lệnh như `docker run`, client sẽ gửi command này đến docker daemon. Một docker client có thể giao tiếp với nhiều docker daemon.
- Docker registry là nơi lưu trữ các docker image. Docker hub là một public registry mà ai cũng có thể sử dụng, và docker được cấu hình tìm kiếm các image mặc định trên docker hub.When bạn run lệnh docker pull hoặc docker run, image được yêu cầu sẽ được pull từ registry đã được config.

## 10. Jenkins là gì?
Jenkins là một opensource dùng để thực hiện chức tích hợp liên tục gọi là CI-continuous integration, và xây dựng các tác vụ trừu tượng hóa. Nó tích hợp source code của các thành viên trong team lại nhanh chóng một cách liên tục, theo giỏi sự thực thi và trạng thái thông qua kiểm thử (integration test, unit test). Tất nhiên nhằm giúp sản phẩm chạy ổn định.
![](https://i.imgur.com/mkST7Ms.png)

#### `CI/CD là gì?`
- CI là viết tắt của Continuous Integration, là tích hợp liên tục, nhằm liên tục tích hợp source code của các thành viên trong nhóm một cách nhanh chóng thông qua các bước test bằng integration test, unit test
- Các bước thực thi:
    - Đầu tiên, dev sẽ pull code mới nhất từ repo về branch để phát triển
    - Tiếp theo là code và test ở local của dev
    - Sau khi code xong, dev sẽ commit và push code lên branch dev của team
    - Dev sẽ pull code mới nhất của repo về, merge và giải quyết conflict. (rebase)
    - Build và đảm bảo code pass qua các test ở local
    - Hoàn tất thì commit code lên repo
    - Máy chủ CI sẽ lắng nghe các thay đổi code từ repository và có thể tự động build và test, sau đó đưa ra các thông báo failed hoặc passed.

![](https://i.imgur.com/UptMVEi.png)


- CD là viết tắt của Continuous Delivery, là một tập các kỹ thuật để triển khai tích hợp source code trên môi trường staging (một môi trường rất giống với môi trường production). Mục đích để đảm bảo source code được review một cách tỉ mỉ trước khi đưa lên production.

## 9. Step by step
- Trong workflow of docker, dev sẽ định nghĩa tất cả các ứng dụng, dependence và các yêu cầu của nó trong một file gọi là dockerfile và dockerfile này có thể được sử dụng để tạo docker image. Do đó, trong docker image này có tất cả ứng dụng, dependence, requirement và khi bạn run docker image, bạn có được một docker container. Docker container là một thể hiện tại thời điểm run time của docker image. Những docker image có thể được lưu trữ online trên các repository public như docker hub. Bạn cũng có thể tìm kiếm các public available docker image cũng như lưu trữ chúng trên docker hub.

## 6. Một số lệnh docker cơ bản

`image`
- Pull docker image từ Docker Hub
```
docker pull {image_name}
```

- Liệt kê các images hiện có

```
docker images
```

- Xóa một images

```
docker rmi {image_id/name}
```

- Save image thành file .tar

```
cat muashi.tar | docker import - {new_imange_name}:latest
```

- Xem lịch sử các commit trên image

```
docker history {image_name}
```
- Khổi phục lại images từ IMAGE_ID
```
docker tag {image_id} {image_new_name}:{tag}
```

`container`
- liệt kê các container đang chạy

```
docker ps
docker ps -a #liệt kê tất cả container
```
- Xóa một container

```
docker rm -f {container_id/name}
```
- Đổi tên một container

```
docker rename {old_container_name} {new_container_name}
```

- Khởi dộng một container
```
docker start {new_container_name}
docker exec -it {new_container_name} /bin/bash
```
- Stop một container cụ thể:

```
docker stop {container_name}
```

- Stop all container:

```
docker stop $(docker ps -a -q)
```

- Tạo một container, đồng thời khởi động với tùy chọn cổng và volume

```
docker run --name {container_name} -p {host_port}:{container_port} -v {/host_path}:{/container_path} -it {image_name} /bin/bash
```

- Xem các thay đổi trên container

```
docker diff {container_name}
```

- Commit các thay đổi trên container và image

```
docker commit -m 'message' {container_name} {image_name}
```

- Build một image từ container

```
docker build -t {container_name}
```