# Git & Code Review
## 1. Git
### 1.1. Thuật ngữ
- Root của nhánh
    - Là commit mà nhánh được tách ra

- Fast-forward (FF)
    - Gộp thay đổi từ nhánh `feature` vào nhánh `master` mà không tạo thêm commit mới.
    - Điều kiện tiên quyết là nhánh `feature` phải có root là commit mới nhất của nhánh `master` (giống như hình)
    ![](https://i.imgur.com/YoZ5n58.png)

    - Trường hợp không fast-forward được
    ![](https://i.imgur.com/qpW1sDj.png)
    - Để giải quyết trường hợp không fast-forward được ta dùng `rebase` để đưa nhánh về commit mới nhất (của `master`)

- Rebase
    > Link: https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase
    - Dùng để chuyển `root của nhánh` hiện tại lên commit mới nhất của nhánh mục tiêu
    ![](https://i.imgur.com/4BiNeIj.png)
    - Cách dùng
    ```
    git rebase [nhánh mục tiêu]
    
    Eg: git rebase master
    ```
    
- Squash
    - Gộp các commit lại thành 1 commit
    - Thường dùng chung fast-forward
    - Cách dùng: https://gist.github.com/shellkore/4ebec03a5893958aa00127d16b20baef
- Merge request (MR)
    

### 1.2. Commit message convention
```
<type>[optional scope]: <description>

Eg: feat(parser): add ability to parse arrays
```
> Link: https://www.conventionalcommits.org/en/v1.0.0-beta.4/
- **Type**
    - `fix`: a commit of the type fix patches a bug in your codebase (this correlates with PATCH in semantic versioning).
    - `feat`: a commit of the type feat introduces a new feature to the codebase (this correlates with MINOR in semantic versioning).
    - `BREAKING CHANGE`: a commit that has the text BREAKING CHANGE: at the beginning of its optional body or footer section introduces a breaking API change (correlating with MAJOR in semantic versioning). A BREAKING CHANGE can be part of commits of any type.
    - `Others`: commit types other than fix: and feat: are allowed, for example @commitlint/config-conventional (based on the Angular convention) recommends chore:, docs:, style:, refactor:, perf:, test:, and others.
    
## 2. Code Review

![](https://i.imgur.com/GsCsBZb.png)


### 2.1. Cấu trúc nhánh project
- **Master**
    - Nhánh deploy production
    - Khi có hot-fix, tách ra nhánh `hot-fix` để xử lý, sau đó merge `fast-forward` vào nhánh `master`.
- **Dev**
    - Tách ra từ `master`
    - Fast-forward về `master` ở cuối mỗi sprint
- **Features**
    - Tách ra từ `dev` để làm tính năng mới
    - Có thể có 1 hoặc nhiều commit.
### 2.2. Đối tượng tham gia
#### 2.1.1. Dev
- Tách nhánh từ commit mới nhất của nhánh `dev`
- Đặt tên nhánh dễ gợi nhớ đến task thực hiện
- Cách tạo merge request:
    - Rebase nhánh gốc (nhánh`dev`), xử lý nếu conflict
    - Push code
    - Tạo merge request:
        - **Title**: Đặt theo commit convention (vd: `feat(parser): add ability to parse arrays`)
        - **Description**: Mô tả chi tiết các thay đổi trong code
        - **Assignee**: Thêm reviewer phụ trách review code
        - Chọn đúng nhánh cần merge
        - Đánh dấu 2 lựa chọn như hình
        ![](https://i.imgur.com/zdaVUik.png)
        - Nhấn `Submit merge request`, báo reviewer nếu cần
- Sau khi merge request được tạo, nếu cần thay đổi (fix bug, feedback, ...), thêm `WIP: ` vào trước title của merge request. 
    - VD: `WIP: feat(parser): add ability to parse arrays`
- Theo dõi và phản hồi với `reviewer` trên giao diện của merge request. Luôn chủ động cho tới khi merge request được merge.

#### 2.1.2. Reviewer
- Review và phản hồi merge request được assign và không có tag `WIP`
- Thực hiện merge fast-forward nếu pass
- Các mục nên review:
    - Code convention
    - Kiểm tra logic quan trọng
    - Tên biến, tên hàm
    - Cấu trúc code
    - Cấu trúc thư mục
    - ...
- Yêu cầu QC test riêng nhánh khi cần

#### 2.1.3. QC
- Tự deloy nếu biết
- Test lại nhánh `dev` khi có `MR` được merge 

## 3. Cách xử lý một số usecase phổ biến
### 3.1. Có nhiều `MR` tại 1 thời điểm
- Sau khi 1 request được merge, cần rebase các `MR` còn lại. Gitlab đã hỗ trợ sẵn nút `rebase` trên giao diện `MR`
![](https://i.imgur.com/mBTkgTI.png)
- Reviewer tự bấm `rebase` để tiến hành rebase
- Trường hợp xảy ra conflict, reviewer yêu cầu dev tự rebase rồi đẩy lên lại.

### 3.2. Cập nhật code từ nhánh `dev` sang `master` sau mỗi sprint
- B1: rebase dev lên master 
    ```
    git checkout dev
    git fetch
    git rebase origin/master
    ```
- B2: Tạo `MR` từ `dev` vào `master`
- B3: Thực hiện merge `FF` như bình thường

### 3.3. Hot fix trên `master`
- B1: Tách nhánh từ commit mới nhất của `master`. Đặt tên nhánh: 
    ```
    hotfix/[tên nhánh]
    ```
- B2: Fixbug trên nhánh `hotfix`
- B3: Tạo `MR` từ `hotfix` vào `master`
- B4: Sau khi `MR hotfix` được merge, rebase lại nhánh `dev` lên `master`

### 3.4. Xử lý conflict khi rebase
```
git rebase origin/master
...conflict...
xử lý conflict bằng ide, merge tool ...
git add .
git rebase --continue
... xử lý như trên nếu vẫn gặp conflict ...
git push --force

```


