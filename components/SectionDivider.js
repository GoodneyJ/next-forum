import dividerStyles from '../styles/SectionDivider.module.css'

export const SectionDivider = (props) => {
    return (
        <div className={`${dividerStyles.sectionDividerContainer} item-container`}>       
            <div className={dividerStyles.innerContent}>
              <h1>{props.title}</h1>
            </div>
          <style jsx>
          {`
              
              h1 {
                letter-spacing: 2px;
              }



              .item-container {
                background: linear-gradient(rgba(0, 0, 0, 0.80), rgba(0, 0, 0, 0.80)), url('/${props.img}') no-repeat center;
                background-size: cover;
                background-attachment: fixed;

                }
            `}
          </style>
        </div>
    )
}

export default SectionDivider