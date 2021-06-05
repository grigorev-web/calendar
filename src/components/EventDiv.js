export default function EventDiv(props) {
  /*
  return(
    <div> Event date: {props.ev.toLocaleString()}</div>
  )
*/

  return (
    <div className="post post_medium">
      <div className="post__image-content">
        <a href="https://russoft.org/events/desyataya-konferentsiya-zeronights-projdet-30-iyunya-v-letnem-peterburge/">
          <img
            className="post__image"
            src="https://cdn.shortpixel.ai/spai/w_374+h_247+q_lossy+ret_img+to_webp/https://russoft.org/wp-content/uploads/2021/06/photo_2021-06-01-11.34.51-376x248.jpeg"
            data-spai="1"
            alt=""
            data-spai-upd="374"
          />
        </a>
      </div>
      <div className="post__content post__content_small post__content_high">
        <a
          className="link post__tag"
          href="https://russoft.org/our-events/?events-cat=russoft-events"
        >
          Мероприятия РУССОФТ
        </a>{" "}
        <a
          href="https://russoft.org/events/desyataya-konferentsiya-zeronights-projdet-30-iyunya-v-letnem-peterburge/"
          className="link post__name post__name_small"
        >
          Десятая конференция ZeroNights пройдет 30 июня в летнем Петербурге{" "}
        </a>
        <div className="post__description">
          В 2021 году в десятый раз пройдет ZeroNights – ежегодная международная
          конференция, посвященная практическим аспектам информационной
          безопасности.{" "}
        </div>
        <div className="post__date">
          <div>Clock</div>
          <span className="post__time">{props.ev.toLocaleString()} </span>
        </div>
      </div>
    </div>
  );
}
