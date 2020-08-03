import React, { Component } from "react";
import $ from "jquery";

class Second extends Component {
  state = {};
  handleBack = (parentDOM, currentDOM) => {
    $(parentDOM).slideDown("fast");
    $(currentDOM).slideUp("fast");
  };
  render() {
    return (
      <div className="secondItem-sublist">
        <button
          className="backToOverLayer"
          onClick={() =>
            this.handleBack(".waterArea-grid-container", ".secondItem-sublist")
          }
        >
          ← بازگشت
        </button>
        <span className="sublist-title">پارامترهای فیزیکی بدنه‌های آبی</span>
        <hr />
        <div className="accordion" id="waterArea-second-accordion">
          <div className="card">
            <div
              className="card-header collapsed"
              id="waterArea-second-headingOne"
              data-toggle="collapse"
              data-target="#waterArea-second-collapseOne"
              aria-expanded="false"
              aria-controls="waterArea-second-collapseOne"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">دمای سطح آب</span>
              </h5>
            </div>

            <div
              id="waterArea-second-collapseOne"
              className="collapse"
              aria-labelledby="waterArea-second-headingOne"
              data-parent="#waterArea-second-accordion"
            >
              <div className="card-body">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
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
              id="waterArea-second-headingTwo"
              data-toggle="collapse"
              data-target="#waterArea-second-collapseTwo"
              aria-expanded="false"
              aria-controls="waterArea-second-collapseTwo"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">سرعت باد در سطح آب</span>
              </h5>
            </div>

            <div
              id="waterArea-second-collapseTwo"
              className="collapse"
              aria-labelledby="waterArea-second-headingTwo"
              data-parent="#waterArea-second-accordion"
            >
              <div className="card-body">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
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
              id="waterArea-second-headingThree"
              data-toggle="collapse"
              data-target="#waterArea-second-collapseThree"
              aria-expanded="false"
              aria-controls="waterArea-second-collapseThree"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">جهت جریان در پهنه آبی</span>
              </h5>
            </div>

            <div
              id="waterArea-second-collapseThree"
              className="collapse"
              aria-labelledby="waterArea-second-headingThree"
              data-parent="#waterArea-second-accordion"
            >
              <div className="card-body">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
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

export default Second;
