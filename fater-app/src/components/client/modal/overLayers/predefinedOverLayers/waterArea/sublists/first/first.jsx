import React, { Component } from "react";
import $ from "jquery";

class First extends Component {
  state = {};
  handleBack = (parentDOM, currentDOM) => {
    $(parentDOM).slideDown("fast");
    $(currentDOM).slideUp("fast");
  };
  render() {
    return (
      <div className="firstItem-sublist">
        <button
          className="backToOverLayer"
          onClick={() =>
            this.handleBack(".waterArea-grid-container", ".firstItem-sublist")
          }
        >
          ← بازگشت
        </button>
        <hr />
        <div className="accordion" id="waterArea-first-accordion">
          <div className="card">
            <div
              className="card-header collapsed"
              id="waterArea-first-headingOne"
              data-toggle="collapse"
              data-target="#waterArea-first-collapseOne"
              aria-expanded="false"
              aria-controls="waterArea-first-collapseOne"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">مساحت پهنه آبی</span>
              </h5>
            </div>

            <div
              id="waterArea-first-collapseOne"
              className="collapse"
              aria-labelledby="waterArea-first-headingOne"
              data-parent="#waterArea-first-accordion"
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
              id="waterArea-first-headingTwo"
              data-toggle="collapse"
              data-target="#waterArea-first-collapseTwo"
              aria-expanded="false"
              aria-controls="waterArea-first-collapseTwo"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">تغییرات مساحت پهنه آبی</span>
              </h5>
            </div>

            <div
              id="waterArea-first-collapseTwo"
              className="collapse"
              aria-labelledby="waterArea-first-headingTwo"
              data-parent="#waterArea-first-accordion"
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
              id="waterArea-first-headingThree"
              data-toggle="collapse"
              data-target="#waterArea-first-collapseThree"
              aria-expanded="false"
              aria-controls="waterArea-first-collapseThree"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">ارتفاع سطح آب پهنه آبی</span>
              </h5>
            </div>

            <div
              id="waterArea-first-collapseThree"
              className="collapse"
              aria-labelledby="waterArea-first-headingThree"
              data-parent="#waterArea-first-accordion"
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
              id="waterArea-first-headingFour"
              data-toggle="collapse"
              data-target="#waterArea-first-collapseFour"
              aria-expanded="false"
              aria-controls="waterArea-first-collapseFour"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">
                  تغییرات مرز نواحی ساحلی دریاها و دریاچه‌ها
                </span>
              </h5>
            </div>

            <div
              id="waterArea-first-collapseFour"
              className="collapse"
              aria-labelledby="waterArea-first-headingFour"
              data-parent="#waterArea-first-accordion"
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

export default First;
