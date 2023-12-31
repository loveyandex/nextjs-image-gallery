import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import Bridge from "../components/Icons/Bridge";
import Logo from "../components/Icons/Logo";
import Modal from "../components/Modal";
import cloudinary from "../utils/cloudinary";
import getBase64ImageUrl from "../utils/generateBlurPlaceholder";
import type { ImageProps } from "../utils/types";
import { useLastViewedPhoto } from "../utils/useLastViewedPhoto";

export const isBrowser = typeof window !== "undefined";

const Home: NextPage = ({ images }: { images: ImageProps[] }) => {
  const router = useRouter();
  const { photoId, ip } = router.query;
  console.log(router.query);

  const [wsInstance, setWsInstance] = useState(null);

  // Call when updating the ws connection
  const updateWs = useCallback(
    (url) => {
      if (!isBrowser) return setWsInstance(null);

      // Close the old connection
      if (wsInstance?.readyState !== 3) wsInstance.close();

      // Create a new connection
      const newWs = new WebSocket(url);
      setWsInstance(newWs);
    },
    [wsInstance]
  );

  // (Optional) Open a connection on mount
  useEffect(() => {
    if (isBrowser && router.query.ip) {
      console.log(router.query);
      const ws = new WebSocket(`ws://${ip?ip:"localhost"}:80/ws`);
      console.log("we are here ");

      ws.onopen = function () {
        console.log("Connected");
      };

      ws.onmessage = function (evt) {
        let d = JSON.parse(evt.data);
        console.log(evt);
        setNews((oldArray) => [
          ...oldArray,
          {
            id: d.Pid,
            height: 2329,
            width: 3500,
            public_id: d.Src,
            format: "jpg",
            caption: d.Pid,
            blurDataUrl:
              "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAFAAgDAREAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAAB//EABwQAAICAgMAAAAAAAAAAAAAAAEDAhEABBITcf/EABQBAQAAAAAAAAAAAAAAAAAAAAP/xAAbEQACAgMBAAAAAAAAAAAAAAABAgAREiEiMf/aAAwDAQACEQMRAD8AMduKkwXJK+PYKIJuvMBXd+WN1GOI2B7P/9k=",
          },
        ]);
      };

      setWsInstance(ws);
    }

    return () => {
      // Cleanup on unmount if ws wasn't closed already
      if (wsInstance ) {
        if (wsInstance?.readyState !== 3) wsInstance.close();
        
      }

    };
  },[router.query]);

  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

  const [news, setNews] = useState([]);

  useEffect(() => {
    console.log("in useeffect");

    // fetch("/api/hello/?page=" + 66)
    //   .then((r) => r.json())
    //   .then((j) => {
    //     console.log(j);
    //     for (const x of j.ps) {
    //       setNews((oldArray) => [...oldArray, x]);

    //       setInterval(
    //         (xxx) => {
    //           fetch("/api/product/?pid=" + xxx.id)
    //             .then((r) => r.json())
    //             .then((jjj) => {
    //               // console.log(news)
    //               for (const xx of jjj.ps) {
    //                 setNews((oldArray) => [...oldArray, xx]);
    //               }
    //             });
    //         },
    //         1000,
    //        x
    //       );
    //     }
    //   })
    //   .catch((er) => console.log(er));

    return () => {};
  }, [photoId]);

  return (
    <>
      <Head>
        <title>Next.js Conf 2022 Photos</title>
        <meta
          property="og:image"
          content="https://nextjsconf-pics.vercel.app/og-image.png"
        />
        <meta
          name="twitter:image"
          content="https://nextjsconf-pics.vercel.app/og-image.png"
        />
      </Head>

      <style>{`
     @media screen and (min-width: 800px) {
      .xcss{
        columns: 9 !important;
       }
       .grid-cols-3 {
        grid-template-columns: repeat(3,minmax(0,1fr));
    }



    .grid-cols-4 {
      grid-template-columns: repeat(9,minmax(0,1fr));
  }

  
    }



      `}</style>
      <main className="mx-auto max-w-[1960px] p-4">
        {photoId && (
          <Modal
            images={images}
            onClose={() => {
              setLastViewedPhoto(photoId);
            }}
          />
        )}
        <div className="xcss grid columns-1 grid-cols-1 grid-cols-4 gap-1 sm:columns-2 sm:grid-cols-2 xl:columns-3 xl:grid-cols-3 2xl:columns-4">
          <div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <span className="flex max-h-full max-w-full items-center justify-center">
                <Bridge />
              </span>
              <span className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
            </div>
            <Logo />
            <h1 className="mb-4 mt-8 text-base font-bold uppercase tracking-widest">
              2022 Event Photos
            </h1>
            <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
              Our incredible Next.js community got together in San Francisco for
              our first ever in-person conference!
            </p>
            <a
              className="pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
              href="https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-cloudinary&project-name=nextjs-image-gallery&repository-name=with-cloudinary&env=NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET,CLOUDINARY_FOLDER&envDescription=API%20Keys%20from%20Cloudinary%20needed%20to%20run%20this%20application"
              target="_blank"
              rel="noreferrer"
            >
              Clone and Deploy
            </a>
          </div>

          {images.map(({ id, public_id, format, blurDataUrl }) => (
            <Link
              key={Math.random()}
              href={`/?photoId=${id}`}
              as={`/p/${id}`}
              ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
              shallow
              className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            >
              <Image
                alt="Next.js Conf photo"
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                style={{ transform: "translate3d(0, 0, 0)" }}
                placeholder="blur"
                blurDataURL={blurDataUrl}
                src={`${public_id}`}
                width={150}
                height={15}
              />
            </Link>
          ))}

          {news.length > 0 &&
            news.map(({ id, public_id, format, blurDataUrl }) => (
              <Link
                key={Math.random()}
                href={`/?photoId=${id}`}
                as={`/p/${id}`}
                ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
                shallow
                className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
              >
                <Image
                  alt="Next.js Conf photo"
                  className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                  style={{ transform: "translate3d(0, 0, 0)" }}
                  placeholder="blur"
                  blurDataURL={blurDataUrl}
                  src={`${public_id}`}
                  width={150}
                  height={15}
                />
              </Link>
            ))}
        </div>
      </main>

      <footer className="p-6 text-center text-white/80 sm:p-12">
        Thank you to{" "}
        <a
          href="https://edelsonphotography.com/"
          target="_blank"
          className="font-semibold hover:text-white"
          rel="noreferrer"
        >
          Josh Edelson
        </a>
        ,{" "}
        <a
          href="https://www.newrevmedia.com/"
          target="_blank"
          className="font-semibold hover:text-white"
          rel="noreferrer"
        >
          Jenny Morgan
        </a>
        , and{" "}
        <a
          href="https://www.garysextonphotography.com/"
          target="_blank"
          className="font-semibold hover:text-white"
          rel="noreferrer"
        >
          Gary Sexton
        </a>{" "}
        for the pictures.
      </footer>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  return {
    props: {
      images: [
        {
          id: 1,
          height: 2329,
          width: 3500,
          public_id:
            "https://dkstatics-public.digikala.com/digikala-products/1a82669e84161648d7b9c2583f2c6e8d8472736b_1701035707.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/quality,q_90",
          format: "jpg",
          caption: "a group of people sitting on top of a stage",
          blurDataUrl:
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAFAAgDAREAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAAB//EABwQAAICAgMAAAAAAAAAAAAAAAEDAhEABBITcf/EABQBAQAAAAAAAAAAAAAAAAAAAAP/xAAbEQACAgMBAAAAAAAAAAAAAAABAgAREiEiMf/aAAwDAQACEQMRAD8AMduKkwXJK+PYKIJuvMBXd+WN1GOI2B7P/9k=",
        },
        {
          id: 1,
          height: 1329,
          width: 1500,
          public_id:
            "https://dkstatics-public.digikala.com/digikala-products/65c912f72a1cf2122adabc3035db74d32a2456f4_1701033573.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/quality,q_90",
          format: "jpg",
          caption: "a group of people sitting on top of a stage",
          blurDataUrl:
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAFAAgDAREAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAAB//EABwQAAICAgMAAAAAAAAAAAAAAAEDAhEABBITcf/EABQBAQAAAAAAAAAAAAAAAAAAAAP/xAAbEQACAgMBAAAAAAAAAAAAAAABAgAREiEiMf/aAAwDAQACEQMRAD8AMduKkwXJK+PYKIJuvMBXd+WN1GOI2B7P/9k=",
        },
        {
          id: 1,
          height: 2329,
          width: 3500,
          public_id:
            "https://dkstatics-public.digikala.com/digikala-products/529da56c658fc03e880a53f438a23dda6da2b74b_1701035760.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/quality,q_90",
          format: "jpg",
          caption: "a group of people sitting on top of a stage",
          blurDataUrl:
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAFAAgDAREAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAAB//EABwQAAICAgMAAAAAAAAAAAAAAAEDAhEABBITcf/EABQBAQAAAAAAAAAAAAAAAAAAAAP/xAAbEQACAgMBAAAAAAAAAAAAAAABAgAREiEiMf/aAAwDAQACEQMRAD8AMduKkwXJK+PYKIJuvMBXd+WN1GOI2B7P/9k=",
        },
        {
          id: 1,
          height: 2329,
          width: 3500,
          public_id:
            "https://dkstatics-public.digikala.com/digikala-products/1a82669e84161648d7b9c2583f2c6e8d8472736b_1701035707.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/quality,q_90",
          format: "jpg",
          caption: "a group of people sitting on top of a stage",
          blurDataUrl:
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAFAAgDAREAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAAB//EABwQAAICAgMAAAAAAAAAAAAAAAEDAhEABBITcf/EABQBAQAAAAAAAAAAAAAAAAAAAAP/xAAbEQACAgMBAAAAAAAAAAAAAAABAgAREiEiMf/aAAwDAQACEQMRAD8AMduKkwXJK+PYKIJuvMBXd+WN1GOI2B7P/9k=",
        },
      ],
    },
  };
}
