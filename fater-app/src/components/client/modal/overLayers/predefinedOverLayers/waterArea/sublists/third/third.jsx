import React, { Component } from "react";
import $ from "jquery";

class Third extends Component {
  state = {};
  handleBack = (parentDOM, currentDOM) => {
    $(parentDOM).slideDown("fast");
    $(currentDOM).slideUp("fast");
  };
  render() {
    return (
      <div className="thirdItem-sublist">
        <button
          className="backToOverLayer"
          onClick={() =>
            this.handleBack(".waterArea-grid-container", ".thirdItem-sublist")
          }
        >
          ← بازگشت
        </button>
        <span className="sublist-title"> پارامترهای کیفیت بدنه‌های آبی</span>
        <hr />
        <div className="accordion" id="waterArea-third-accordion">
          <div className="card">
            <div
              className="card-header collapsed"
              id="waterArea-third-headingOne"
              data-toggle="collapse"
              data-target="#waterArea-third-collapseOne"
              aria-expanded="false"
              aria-controls="waterArea-third-collapseOne"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">میزان کلروفیل</span>
              </h5>
            </div>

            <div
              id="waterArea-third-collapseOne"
              className="collapse"
              aria-labelledby="waterArea-third-headingOne"
              data-parent="#waterArea-third-accordion"
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
              id="waterArea-third-headingTwo"
              data-toggle="collapse"
              data-target="#waterArea-third-collapseTwo"
              aria-expanded="false"
              aria-controls="waterArea-third-collapseTwo"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">ذرات معلق (آلی)</span>
              </h5>
            </div>

            <div
              id="waterArea-third-collapseTwo"
              className="collapse"
              aria-labelledby="waterArea-third-headingTwo"
              data-parent="#waterArea-third-accordion"
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
              id="waterArea-third-headingThree"
              data-toggle="collapse"
              data-target="#waterArea-third-collapseThree"
              aria-expanded="false"
              aria-controls="waterArea-third-collapseThree"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">ذرات معلق معدنی (فسفر)</span>
              </h5>
            </div>

            <div
              id="waterArea-third-collapseThree"
              className="collapse"
              aria-labelledby="waterArea-third-headingThree"
              data-parent="#waterArea-third-accordion"
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
              id="waterArea-third-headingFour"
              data-toggle="collapse"
              data-target="#waterArea-third-collapseFour"
              aria-expanded="false"
              aria-controls="waterArea-third-collapseFour"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">شوری آب</span>
              </h5>
            </div>

            <div
              id="waterArea-third-collapseFour"
              className="collapse"
              aria-labelledby="waterArea-third-headingFour"
              data-parent="#waterArea-third-accordion"
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
              id="waterArea-third-headingFive"
              data-toggle="collapse"
              data-target="#waterArea-third-collapseFive"
              aria-expanded="false"
              aria-controls="waterArea-third-collapseFive"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">سیانوباکتری‌ها</span>
              </h5>
            </div>

            <div
              id="waterArea-third-collapseFive"
              className="collapse"
              aria-labelledby="waterArea-third-headingFive"
              data-parent="#waterArea-third-accordion"
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
              id="waterArea-third-headingSix"
              data-toggle="collapse"
              data-target="#waterArea-third-collapseSix"
              aria-expanded="false"
              aria-controls="waterArea-third-collapseSix"
            >
              <h5 className="mb-0">
                <span className="btn btn-default">تابش فعال فتوسنتزی</span>
              </h5>
            </div>

            <div
              id="waterArea-third-collapseSix"
              className="collapse"
              aria-labelledby="waterArea-third-headingSix"
              data-parent="#waterArea-third-accordion"
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

export default Third;
