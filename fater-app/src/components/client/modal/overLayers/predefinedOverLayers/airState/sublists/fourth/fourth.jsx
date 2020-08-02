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
            this.handleBack(".airState-grid-container", ".fourthItem-sublist")
          }
        >
          ← بازگشت
        </button>
        <hr />
        <div className="accordion" id="airState-fourth-accordion">
          <div className="card">
            <div
              className="card-header collapsed"
              id="airState-fourth-headingOne"
              data-toggle="collapse"
              data-target="#airState-fourth-collapseOne"
              aria-expanded="false"
              aria-controls="airState-fourth-collapseOne"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">گرد و غبار‌های فعال</span>
              </h5>
            </div>

            <div
              id="airState-fourth-collapseOne"
              className="collapse"
              aria-labelledby="airState-fourth-headingOne"
              data-parent="#airState-fourth-accordion"
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

          <div className="card">
            <div
              className="card-header collapsed"
              id="airState-fourth-headingTwo"
              data-toggle="collapse"
              data-target="#airState-fourth-collapseTwo"
              aria-expanded="false"
              aria-controls="airState-fourth-collapseTwo"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">پیش‌بینی گرد و غبار</span>
              </h5>
            </div>

            <div
              id="airState-fourth-collapseTwo"
              className="collapse"
              aria-labelledby="airState-fourth-headingTwo"
              data-parent="#airState-fourth-accordion"
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
