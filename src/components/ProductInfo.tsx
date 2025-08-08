import React from 'react';
import cn from 'classnames';

type ProductInfoProps = {
    /**
     * The name of the product.
     */
    name: string;

    /**
     * The price of the product.
     */
    price: number;

    /**
     * The description of the product.
     */
    description: string;

    /**
     * The color of the product.
     */
    color: string;

    /**
     * Class name of the product info.
     */
    className?: string;
};

export const ProductInfo: React.FC<ProductInfoProps> = (
    props,
) => {
    return (
        <div className={cn('min-w-100', props.className)}>
            <div>
                <div
                    className="tracking-widest text-[4rem] font-bold top-0 left-0 mb-5"
                    style={{
                        color: props.color,
                    }}
                >
                    ${props.price}
                </div>

                <div className="top-30 left-0 mb-5 text-pretty max-w-[20%]">
                    <h1 className="text-4xl font-bold">
                        {props.name}
                    </h1>
                </div>

                <div className="top-50 left-0 mb-5 text-pretty max-w-[20%]">
                    <p className="text-xl">
                        {props.description}
                    </p>
                </div>

                <div className="top-70 -left-2 mb-5">
                    <button
                        className="px-4 py-2 rounded-full w-50 h-15 transition-all duration-300 ease-out active:scale-80 hover:scale-120"
                        style={{
                            backgroundColor: props.color,
                        }}
                    >
                        Order Now
                    </button>
                </div>
            </div>
        </div>
    );
};
