import React, { Component } from "react";
import $ from "jquery";
import VerticalTabs from "../verticalTab/verticalTab";
import "ol/ol.css";
import { Image as ImageLayer, Tile as TileLayer } from "ol/layer";
import XYZ from "ol/source/XYZ";
import RasterSource from "ol/source/Raster";
import chroma from "chroma-js";

class First extends Component {
  state = {};
  handleBack = (parentDOM, currentDOM) => {
    $(parentDOM).slideDown("fast");
    $(currentDOM).slideUp("fast");
  };
  configuration = {
    tabs: [
      {
        label: "دریای خزر",
        content: `رم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
      استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
      در ستون و سطرآنچان که لازم است، و برای شرایط فعلی تکنولوژی مورد
      نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
 علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
      زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
      دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
      زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
      پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`,
        handleAddLayer: () => {
          const mapContainer = $("#mapContainer").data("map");
          console.log("دریای خزر اضافه شد");

          var minVgi = 0;
          var maxVgi = 0.25;
          var bins = 10;

          var palet = chroma.scale(["yellow", "008ae5"]);

          /**
           * Calculate the Vegetation Greenness Index (VGI) from an input pixel.  This
           * is a rough estimate assuming that pixel values correspond to reflectance.
           * @param {Array<number>} pixel An array of [R, G, B, A] values.
           * @return {number} The VGI value for the given pixel.
           */
          function vgi(pixel) {
            var r = pixel[0] / 255;
            var g = pixel[1] / 255;
            var b = pixel[2] / 255;
            return (2 * g - r - b) / (2 * g + r + b);
          }
          var scale = chroma
            .scale(["red", "orange", "yellow", "green", "blue", "purple"])
            .colors(25);

          function summarize(value, counts) {
            var min = counts.min;
            var max = counts.max;
            var num = counts.values.length;
            if (value < min) {
              // do nothing
            } else if (value >= max) {
              counts.values[num - 1] += 1;
            } else {
              var index = Math.floor((value - min) / counts.delta);
              counts.values[index] += 1;
            }
          }

          /**
           * Use aerial imagery as the input data for the raster source.
           */

          var key = "nEpI4PLiQ94chsicl5PF";
          var attributions =
            '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
            '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

          var aerial = new XYZ({
            attributions: attributions,
            url:
              "https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=" +
              key,
            maxZoom: 20,
            crossOrigin: "",
          });

          var aerial2 = new XYZ({
            attributions: attributions,
            url:
              "http://192.168.21.2/qweasd/heat/sentinel-5p_No2/{z}/{x}/{-y}.png",
            maxZoom: 5,
            crossOrigin: "",
          });
          /**
           * Create a raster source where pixels with VGI values above a threshold will
           * be colored green.
           */
          var raster = new RasterSource({
            sources: [aerial],
            /**
             * Run calculations on pixel data.
             * @param {Array} pixels List of pixels (one per source).
             * @param {Object} data User data object.
             * @return {Array} The output pixel.
             */
            operation: function (pixels, data) {
              var pixel = pixels[0];

              // if (pixel[0] !== 0 || pixel[1] !== 0 || pixel[2] !== 0 || pixel[3] !== 0) {
              //   console.log("pixel :>> ", pixel);
              // }
              var value = vgi(pixel);
              summarize(value, data.counts);

              // if (pixel[0] !== 0 || pixel[1] !== 0 || pixel[2] !== 0 || pixel[3] !== 0) {
              //   const pixel2 = pixel;

              //   // var t =
              //   //   (pixel2[0] +
              //   //     256 * pixel2[1] +
              //   //     256 * 256 * pixel2[2] +
              //   //     256 * 256 * 256 * pixel2[3]) /
              //   //   10000000000;
              //   // console.log("pixel :>> ", pixel);
              //   // pixel[0] = t * 255;
              //   // pixel[1] = 0;
              //   // pixel[2] = 0;
              //   // pixel[3] = 255;

              //   // pixel[0] = 255;
              //   // pixel[1] = 0;
              //   // pixel[2] = 0;
              //   // pixel[3] = pixel2[0];
              // }

              if (value >= data.threshold) {
                if (value >= 0.1 && value < 0.2) {
                  pixel[0] = 255;
                  pixel[1] = 0;
                  pixel[2] = 0;
                  pixel[3] = 127.5;
                } else if (value >= 0.2 && value < 0.3) {
                  pixel[0] = 0;
                  pixel[1] = 0;
                  pixel[2] = 255;
                  pixel[3] = 127.5;
                } else if (value >= 0.3) {
                  pixel[0] = 0;
                  pixel[1] = 255;
                  pixel[2] = 0;
                  pixel[3] = 127.5;
                } else {
                  // console.log(value);
                }
              } else {
                pixel[3] = 0;
              }
              return pixel;
            },
            lib: {
              vgi: vgi,
              summarize: summarize,
            },
          });
          raster.set("threshold", 0.1);

          function createCounts(min, max, num) {
            var values = new Array(num);
            for (var i = 0; i < num; ++i) {
              values[i] = 0;
            }
            return {
              min: min,
              max: max,
              values: values,
              delta: (max - min) / num,
            };
          }

          raster.on("beforeoperations", function (event) {
            event.data.counts = createCounts(minVgi, maxVgi, bins);
            event.data.threshold = raster.get("threshold");
          });

          console.log(
            "mapContainer.getLayers().array_ :>> ",
            mapContainer.getLayers().array_
          );
          mapContainer.getLayers().array_.push(
            new TileLayer({
              source: aerial,
              // opacity: 0.1,
            })
          );
          mapContainer.getLayers().array_.push(
            new ImageLayer({
              source: raster,
            })
          );
          console.log(
            "mapContainer.getLayers().array_ :>> ",
            mapContainer.getLayers().array_
          );

          console.log("this.props :>> ", this.props);
          this.props.refreshComponent();
        },
      },
      {
        label: "دریاچه مهارلو",
        content: `رم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
      استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
      در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
      نیاز، و خت تایپ به پایان رسد و
      زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
      پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`,
        handleAddLayer: function () {
          console.log("دریاچه مهارلو  اضافه شد");
        },
      },
      {
        label: "دریاچه ارومیه",
        content: `رم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
      استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
      در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
      نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
      کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
      جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را
      برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
      زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
      دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
      زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
      پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`,
        handleAddLayer: function () {
          console.log("دریاچه ارومیه اضافه شد");
        },
      },
      {
        label: "دریاچه تار",
        content: `رم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
      استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
      در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
      نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
      کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شنا ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
      زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
      پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`,
        handleAddLayer: function () {
          console.log("دریاچه تار اضافه شد");
        },
      },
      {
        label: "دریاچه حوض سلطان",
        content: `رم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
      استفاده از طراحان گرافیک است، چاپگرها و متونی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
      زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
      دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
      زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
      پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`,
        handleAddLayer: function () {
          console.log("دریاچه حوض سلطان اضافه شد");
        },
      },
      {
        label: "دریاچه گهر",
        content: `رم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
      استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
      در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
      نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
      کتابهای زیادی در شصت و سه درصد گذشته حال و  علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
      زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
      دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
      زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
      پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`,
        handleAddLayer: function () {
          console.log("دریاچه گهر اضافه شد");
        },
      },
      {
        label: "دریاچه میقان اراک",
        content: `رم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
      استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
      در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
      نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
      کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
      جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را
      برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
      زبان فارسی ایجاد کرد، در این ص`,
        handleAddLayer: function () {
          console.log("دریاچه میقان اراک اضافه شد");
        },
      },
    ],
    tabPanel: [{}],
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
                <VerticalTabs configuration={this.configuration} />
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
