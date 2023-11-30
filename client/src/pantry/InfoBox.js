import React from 'react'

function InfoBox({ name, longName, description, group, subgroup, image }) {

    return (
        <div className="info-box" style={{ padding: "25px" }}>

            <strong style={{ fontSize: "14pt" }}>{name ? name.charAt(0).toUpperCase() + name.slice(1) : 'No ingredient selected'}</strong>

            {image && (
                <img className="ingredient-image" src={image} alt={name} style={{ marginRight: '10px', float: 'right', borderRadius: '50%', width: '55px', height: '55px' }}></img>
            )}
            <br />
            {(group || subgroup) ? (
                <div>
                    <div>
                        {group ? (
                            <span>Group: <i>{group}</i></span>
                        ) : (
                            <span>n/a</span>
                        )}
                    </div>
                    <div>
                        {subgroup ? (
                            <span>Subgroup: <i>{subgroup}</i></span>
                        ) : (
                            <span>n/a</span>
                        )}
                    </div>
                </div>
            ) : (
                <div>
                    {longName ? (
                        <i>{` ${longName.toLowerCase()}`}</i>
                    ) : (
                        <i>n/a</i>
                    )}

                    <div style={{
                        height: "auto",
                        margin: "30px 0 0 0",
                        padding: "10px",
                        border: "1px solid rgba(0, 0, 0, 0.274)",
                        borderRadius: "4px"
                    }}>
                        {description ? (description) : (<span>No description</span>)}
                    </div>
                </div>
            )
            }

        </div>
    )
}

export default InfoBox
