import clsx from 'clsx';

import Heading from '@theme/Heading';

import styles from './styles.module.css';

const FeatureList = [
  {
    title: "Elearning thật dễ dàng",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        Với giao diện người dùng thân thiện và dễ sử dụng, bạn sẽ có thể nhanh
        chóng làm quen và bắt đầu sử dụng phần mềm một cách dễ dàng. Không chỉ
        cung cấp các tính năng đầy đủ, phần mềm của chúng tôi còn mang lại sự
        tiện lợi tuyệt đối, giúp bạn dễ dàng điều hướng và tận dụng tối đa các
        tính năng.
      </>
    ),
  },
  {
    title: "Đầy đủ nghiệp vụ",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        Giải pháp hoàn hảo cho nhu cầu nghiệp vụ của bạn. Với cam kết cung cấp
        nghiệp vụ đầy đủ và tiện lợi, chúng tôi đảm bảo rằng bạn sẽ tiết kiệm
        thời gian và nỗ lực trong quá trình làm việc.
      </>
    ),
  },
  {
    title: "Hướng dẫn chi tiết",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        Tài liệu hướng dẫn cung cấp cho bạn một hướng dẫn chi tiết và dễ hiểu về
        cách sử dụng hệ thống. Hãy khám phá chức năng thông qua tài liệu hướng
        dẫn đầy đủ và chi tiết
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
