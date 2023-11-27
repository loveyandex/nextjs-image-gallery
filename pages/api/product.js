export default async function handler(req, res) {
  let resp = await fetch(
    "https://api.digikala.com/v2/product/" + req.query.pid + "/"
  );

  let x = await resp.json();
  // console.log(x.data.product);
  let images = [];

  for (const m of x.data.product.images.main.url) {
    images.push({
      id: x.data.product.id,
      height: 2329,
      width: 3500,
      public_id: m,
      format: "jpg",
      caption: x.data.product.title_fa,
      blurDataUrl:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAFAAgDAREAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAAB//EABwQAAICAgMAAAAAAAAAAAAAAAEDAhEABBITcf/EABQBAQAAAAAAAAAAAAAAAAAAAAP/xAAbEQACAgMBAAAAAAAAAAAAAAABAgAREiEiMf/aAAwDAQACEQMRAD8AMduKkwXJK+PYKIJuvMBXd+WN1GOI2B7P/9k=",
    });
  }

  for (const l of x.data.product.images.list) {
    for (const m of l.url) {
      images.push({
        id: x.data.product.id,
        height: 2329,
        width: 3500,
        public_id: m,
        format: "jpg",
        caption: x.data.product.title_fa,
        blurDataUrl:
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAFAAgDAREAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAAB//EABwQAAICAgMAAAAAAAAAAAAAAAEDAhEABBITcf/EABQBAQAAAAAAAAAAAAAAAAAAAAP/xAAbEQACAgMBAAAAAAAAAAAAAAABAgAREiEiMf/aAAwDAQACEQMRAD8AMduKkwXJK+PYKIJuvMBXd+WN1GOI2B7P/9k=",
      });
    }
  }

  res.status(200).json({ ps: images });
}
