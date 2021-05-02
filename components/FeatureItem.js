import featureItemStyles from '../styles/FeatureItem.module.css'


export const FeatureItem = (props) => {
    const Icon = props.icon;
    return (
        <div className={featureItemStyles.featureItemContainer}>
            <div className={featureItemStyles.contentWrapper}>
                <h1>{props.icon}</h1>
                <h2>{props.feature}</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, veniam nemo? Placeat illum voluptatem sed, a et veniam minima totam molestias reiciendis exercitationem provident illo.</p>
            </div>
            <style jsx>
                {`
                    h1 {
                        font-size: 3.5rem;
                        margin: 0.25rem;
                    }

                    h2 {
                        margin-top: 0;
                    }


                `}
            </style>
        </div>
    )
}

export default FeatureItem
