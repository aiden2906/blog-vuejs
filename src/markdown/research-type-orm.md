# Tìm hiểu tất tần tật về typeORM
## 1. Khái niệm về typeORM
- ORM (**O**bject **R**elation **M**apping), là một kỹ thuật, cơ chế thực hiện ánh xạ CSDL sang các đối tượng trong các ngôn ngữ lập trình hướng đối tượng như JAVA, C#, ... và các table sẽ tương ứng với các Class, mối quan hệ giữa các table tương ứng với quan hệ giữa các Class.
- TypeORM là một orm có thể chạy trên nền tảng nodeJS, Browser, Cordova, PhoneGap, lonic, ReactNative, NativeScript,... và còn dùng được với typescript và javascript. Công cụ ra đời nhằm hỗ trợ các tính năng Javascript mới nhất, và cung cấp các tính năng bổ sung giúp bạn phát triển ứng dụng tích hợp cơ sở dữ liệu.
- TypeORM hỗ trợ cả pattern Active record và Data Mapper.Khác với tất cả các ORM JavaScript hiện có, với TypeORM bạn có thể viết các ứng dụng high quality, loosely coupled, scalable và maintainable thật hiệu quả nhất.
### 1.1 ActiveRecord
- Một ví dụ điển hình của **Active record** là:
```
$user = new User;  
$user->username = ‘philipbrown’;  
$user->save();
```
- các ORM kiểu Active record hoạt động ánh xạ một đối tượng vào một hàng trong bảng của CSDL, ví dụ như trên, chúng ta sẽ ánh xạ đối tượng user vào một hàng trong bảng User. Nghĩa là Active record là cách tiếp cận mà trong đó, các row trong database được map 1-1 với các object.

### 1.2 DataMapper
- DataMapper là một mô hình ánh xạ hướng đối tượng. Khác với mô hình Active Record, Data Mapper giữ cho dữ liệu được lưu trong bộ máy và trong cơ sở dữ liệu độc lập với nhau. Nghĩa là không có đối tượng nào biết bất cứ điều gì về cơ sở dữ liệu và cũng không thể gọi các phương thức như save() để lưu nó vào cơ sở dữ liệu vì đơn giản là phương thức đó không tồn tại.
```
$user = new User;  
$user->username = ‘philipbrown’;  
EntityManager::persist($user);  
```
- Nhưng thay vào đó, ta có thể sử dụng một dịch vụ hoàn toàn khác được gọi là Entity Manager. Điều này giúp cho các đối tượng của bạn nhẹ hơn vì chúng không phải kế thừa ORM để có thể tương tác với CSDL.

### 1.3 ActiveRecord và DataMapper sử dụng như thế nào ?
- Trước tiên model của bạn sẽ trông như thế này nếu bạn dùng DataMapper
```javascript
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

}
```
- Và domain logic sẽ như sau:
```javascript
const user = new User();
user.firstName = "Timber";
user.lastName = "Saw";
user.age = 25;
await repository.save(user);

const allUsers = await repository.find();
const firstUser = await repository.findOne(1); // find by id
const timber = await repository.findOne({ firstName: "Timber", lastName: "Saw" });

await repository.remove(timber);
```
- Còn nếu bạn tiếp cận theo hướng dùng ActiveRecord, model của bạn sẽ như sau:
```javascript
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

}
```
- Và các đối tượng của bạn có thể giao tiếp với CSDL thông qua các phương thức được kế thừa:
```javascript
const user = new User();
user.firstName = "Timber";
user.lastName = "Saw";
user.age = 25;
await user.save();

const allUsers = await User.find();
const firstUser = await User.findOne(1);
const timber = await User.findOne({ firstName: "Timber", lastName: "Saw" });

await timber.remove();
```
## 2. Cách sử dụng typeORM
- **@Entity()** được sử dụng để khởi tạo một model trong database và bạn có thể thoải mái thực hiện các tác vụ create, delete, read, update cho entity. Có thể chỉ định name cho table nếu không muốn sử dụng tên mặc định (tên class) bằng cách khai báo tên bên trong decorator Entity.
- **@Column()** dùng để tạo ra các cột cho entity được khởi tạo bằng **@Entity()**, ngoài ra có thể sử dụng **@PrimaryGeneratedColumn()** để sinh ra một column tự tạo giá trị cho Coumn đó và có thể chỉ định giá trị được tạo ra là uuid **@PrimaryGeneratedColumn("uuid")**.
    - trong **@Column()** có thể chỉ định data type. Theo mặc định thì kiểu string sẽ được map đến một type dạng varchar(255)-tùy theo database type. Còn số thì sẽ được map đến môt type dạng integer-tùy theo database type.
    ```javascript
    @Column({ type: "int" })
    ```
    - Trong postgres hỗ trợ các kiểu dữ liệu như: int, int2, int4, int8, smallint, integer, bigint, decimal, numeric, real, float, float4, float8, double precision, money, character varying, varchar, character, char, text, citext, hstore, bytea, bit, varbit, bit varying, timetz, timestamptz, timestamp, timestamp without time zone, timestamp with time zone, date, time, time without time zone, time with time zone, interval, bool, boolean, enum, point, line, lseg, box, path, polygon, circle, cidr, inet, macaddr, tsvector, tsquery, uuid, xml, json, jsonb, int4range, int8range, numrange, tsrange, tstzrange, daterange, geometry, geography, cube. Và trong đó ++không hề có kiểu dữ liệu array++. Do đó, để có thể lưu một dữ liệu kiểu mảng vào một field trong table postgres, thì có thể chọn type **json** hoặc **jsonb**
    - Trong postgres có hỗ trợ kiểu enum
    ```javascript
    export enum UserRole {
    ADMIN = "admin",
    EDITOR = "editor",
    GHOST = "ghost"
    }

    @Entity()
    export class User {

        @PrimaryGeneratedColumn()
        id: number;

        @Column({
            type: "enum",
            enum: UserRole,
            default: UserRole.GHOST
        })
        role: UserRole

    }
    ```
    - Ngoài ra, Column type còn hỗ trợ kiểu **simple-array** cho phép bạn lưu trữ giá trị của một mảng dưới dạng string và phần tử tách nhau bởi dấu phẩy.
    ```javascript
    @Entity()
    export class User {

        @PrimaryGeneratedColumn()
        id: number;

        @Column("simple-array")
        names: string[];

    }
    
    const user = new User();
    user.names = [
        "Alexander",
        "Alex",
        "Sasha",
        "Shurik"
    ];
    ```
    - **simple-json** cho phép bạn lưu trữ bất kỳ giá trị nào vào database thông qua **JSON.stringify**. Điều này rất hữu ích khi DB của bạn không hỗ trợ json type.
    ```javascript
    @Entity()
    export class User {

        @PrimaryGeneratedColumn()
        id: number;

        @Column("simple-json")
        profile: { name: string, nickname: string };

    }
    
    const user = new User();
    user.profile = { name: "John", nickname: "Malkovich" };
    ```
- TypeORM hỗ trợ một số ColumnOption:
    - [ ] type: chỉ định type của column
    - [ ] name: chỉ định tên của cột trong database table
    - [ ] length
    - [ ] width
    - [ ] onUpdate
    - [ ] nullable
    - [ ] update
    - [ ] insert
    - [ ] select
    - [ ] default
    - [ ] primary
    - [ ] unique
    - [ ] comment
    - [ ] precision
    - [ ] scale
    - [ ] zerofill
    - [ ] unsigned
    - [ ] charset
    - [ ] enum
    - [ ] array
    - [ ] transformer
