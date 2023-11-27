// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  let resp = await fetch(
    "https://api.digikala.com/v1/categories/home-appliance/search/?sort=29&page="+req.query.page
  );

  let x = await resp.json();
  // console.log(x.data.products);
  let images = [];

  for (const p of x.data.products) {
    images.push({
      id: p.id,
      height: 2329,
      width: 3500,
      public_id: p.images.main.url[0],
      format: "jpg",
      caption: p.title_fa,
      blurDataUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAFAAgDAREAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAAB//EABwQAAICAgMAAAAAAAAAAAAAAAEDAhEABBITcf/EABQBAQAAAAAAAAAAAAAAAAAAAAP/xAAbEQACAgMBAAAAAAAAAAAAAAABAgAREiEiMf/aAAwDAQACEQMRAD8AMduKkwXJK+PYKIJuvMBXd+WN1GOI2B7P/9k=",
    });
  } 

  res.status(200).json({ ps: images });
}

