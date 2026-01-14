export const GenderInput = (props) => {
    return (
        <div className="flex gap-2 my-1 mx-2" >
            <label>
                <input
                    type="radio"
                    value="male"
                    {...props}
                    // name={name}
                    
                    // onChange={onChange}
                    // onBlur={onBlur}
                    // ref={ref}
                />
                Male
            </label>

            <label>
                <input
                    type="radio"
                    value="female"
                    {...props}
                    // name={name}
                    // onChange={onChange}
                    // onBlur={onBlur}
                    // ref={ref}
                />
                Female
            </label>

            <label>
                <input
                    type="radio"
                    value="other"
                    {...props}
                    // name={name}
                    // onChange={onChange}
                    // onBlur={onBlur}
                    // ref={ref}
                />
                Other
            </label>
        </div>
    );
};