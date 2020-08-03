import React, { Component } from "react";
import $ from "jquery";

class Fourth extends Component {
  state = {};
  handleBack = (parentDOM, currentDOM) => {
    $(parentDOM).slideDown("fast");
    $(currentDOM).slideUp("fast");
  };
  render() {
    return (
      <div className="fourthItem-sublist">
        <button
          className="backToOverLayer"
          onClick={() =>
            this.handleBack(".waterArea-grid-container", ".fourthItem-sublist")
          }
        >
          ← بازگشت
        </button>
        <span className="sublist-title">رویداد</span>
        <hr />
        <div className="accordion" id="waterArea-fourth-accordion">
          <div className="card">
            <div
              className="card-header collapsed"
              id="waterArea-fourth-headingOne"
              data-toggle="collapse"
              data-target="#waterArea-fourth-collapseOne"
              aria-expanded="false"
              aria-controls="waterArea-fourth-collapseOne"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">آلودگی نفتی</span>
              </h5>
            </div>

            <div
              id="waterArea-fourth-collapseOne"
              className="collapse"
              aria-labelledby="waterArea-fourth-headingOne"
              data-parent="#waterArea-fourth-accordion"
            >
              <div className="card-body">
                ورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
                کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
                جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را
                برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
                زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
                دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
                زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
                پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Fourth;
