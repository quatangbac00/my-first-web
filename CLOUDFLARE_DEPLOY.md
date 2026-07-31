# Triển khai thử nghiệm trên Cloudflare Workers

Tài liệu này hướng dẫn triển khai thử nghiệm dự án trên Cloudflare Workers bằng OpenNext. Vercel vẫn được giữ nguyên để có thể quay lại bất cứ lúc nào.

## 1. Chuẩn bị tài khoản và mã nguồn

1. Tạo hoặc đăng nhập tài khoản Cloudflare.
2. Vào **Workers & Pages** trên Cloudflare Dashboard.
3. Kết nối tài khoản GitHub nếu Cloudflare yêu cầu.
4. Chọn repository của dự án.
5. Chọn branch `codex/cloudflare-workers-migration` để thử nghiệm. Không chọn `main` cho đến khi đã kiểm tra xong.

## 2. Thêm biến môi trường

Trong phần **Settings** → **Variables and Secrets** của Worker, thêm các biến sau cho môi trường preview và production khi sẵn sàng:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SITE_URL`

Không ghi giá trị các biến này vào mã nguồn, file cấu hình Wrangler hoặc commit Git. Khi dùng tên miền thật, đặt `NEXT_PUBLIC_SITE_URL` thành địa chỉ đầy đủ, ví dụ `https://ten-mien-cua-ban.vn`, rồi chạy lại build preview.

## 3. Lệnh build và xem thử trên máy

Mở terminal trong thư mục dự án và chạy:

```powershell
npm.cmd install
npm.cmd run build
npm.cmd run build:cf
npm.cmd run preview
```

`npm.cmd run preview` dùng runtime Cloudflare `workerd`, khác với `next dev`, nên đây là cách phù hợp để kiểm tra trước khi đưa lên Cloudflare. Mở địa chỉ local mà Wrangler in ra (thường là `http://127.0.0.1:8787`) và kiểm tra trang chủ, sản phẩm, giỏ hàng, `/robots.txt`, `/sitemap.xml` và `/admin`.

Sau khi thay đổi `wrangler.jsonc`, có thể tạo lại type local bằng:

```powershell
npm.cmd run cf-typegen
```

File typegen và thư mục build Cloudflare được bỏ qua khỏi Git.

## 4. Tạo preview trên Cloudflare

Khi branch migration đã được push lên GitHub, dùng luồng Workers Builds trong Dashboard để tạo deployment thử nghiệm từ branch này. Xem log build trong phần **Deployments** và log chạy trong **Observability** hoặc **Logs** của Worker.

Chỉ sau khi preview ổn định mới chạy lệnh deploy từ CI hoặc máy cục bộ:

```powershell
npm.cmd run deploy
```

Lệnh này tạo deployment Cloudflare, vì vậy không chạy nó khi chỉ cần kiểm tra local. Không deploy production trong giai đoạn migration thử nghiệm.

## 5. Kiểm tra trước production

- Trang chủ và danh sách sản phẩm tải được.
- Trang sản phẩm, ảnh và tìm kiếm hoạt động.
- Giỏ hàng còn dữ liệu sau khi tải lại trang.
- Form đặt hàng mở được; không tạo đơn thử trên dữ liệu thật.
- `/robots.txt` và `/sitemap.xml` trả về bình thường.
- Trang đăng nhập admin tải được; chỉ kiểm tra đăng nhập với tài khoản hợp lệ khi cần.
- Không có lỗi 500 trong preview hoặc log runtime.
- `NEXT_PUBLIC_SITE_URL` đã là domain đúng cho môi trường đó.
- Không có secret, `.env.local`, `.open-next` hoặc `node_modules` trong diff Git.

## 6. Gắn tên miền sau khi preview ổn định

1. Trong Worker trên Cloudflare, mở **Settings** → **Domains & Routes**.
2. Thêm custom domain và làm theo hướng dẫn DNS của Cloudflare.
3. Cập nhật `NEXT_PUBLIC_SITE_URL` theo domain thật.
4. Tạo lại preview và kiểm tra SEO, sitemap, robots và link chia sẻ sản phẩm.

## 7. Rollback và quay lại Vercel

- Nếu deployment Cloudflare có lỗi, chọn phiên bản deployment trước trong Workers Dashboard để rollback, hoặc dừng dùng branch migration.
- Nếu tên miền đã chuyển, đưa DNS/route trở lại Vercel theo cấu hình cũ.
- Không xóa project Vercel trước khi Cloudflare đã chạy ổn định và được kiểm tra đầy đủ.
- Giữ branch migration riêng; chỉ merge vào `main` sau khi có người phụ trách xác nhận.
