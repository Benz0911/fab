import React,{useState} from "react"

function Search() {
    const [choice,setChoice] = useState({tabs:'post'})
    
    const handleTab = (e) => {
        const {name,value,checked,type} = e.target
        setChoice(oldValue => {
            return {...oldValue,
                    [name]:type == 'checkbox' ? checked:value
                   }
        })
    }

    return (
        <section id="home_forms" className="with-padding">
            <div className="tabs">
                <input id="post_a_job_tab" type="radio" name="tabs" value="post" checked={choice.tabs == 'post'} onChange={handleTab}/>
                <label className="tab-link post-a-job-link" htmlFor="post_a_job_tab" title="Post a Job">Post a Job</label>
                <input id="find_a_builder_tab" type="radio" name="tabs" value="find" checked={choice.tabs == 'find'} onChange={handleTab} />
                <label className="tab-link find-a-builder-link" htmlFor="find_a_builder_tab" title="Find a Builder">Find a Builder</label>
            </div>
            <section id="content_post_a_job">
                <div className="tab-content">
                    <div className="tab-content_wrap">
                        <form name="paj" className="fb-form fb_form" id="paj_form_main" method="post" action="/post-a-job">
                            <input type="hidden" name="paj[enter_query]" value="faj" id="paj_enter_query"/>
                            <input className="localarea_widget_id" type="hidden" name="paj[localarea_id]" id="paj_localarea_id"/>
                            <input className="localarea_widget_district_id" type="hidden" name="paj[district_id]" id="paj_district_id"/>
                            <input className="localarea_widget_postcode" type="hidden" name="paj[postcode]" id="paj_postcode"/>
                            <input className="specialist_widget_id" type="hidden" name="paj[specialist_id]" id="paj_specialist_id"/>
                            <input className="table_level_widget" type="hidden" name="paj[table_level]" id="paj_table_level"/>
                            <input type="hidden" name="paj[_csrf_token]" value="9ae4f087cfb94a18c8c57e68cda93b56" id="paj__csrf_token"/>
                            <div className="form-container">
                                <div className="fb-form_inner">
                                    <div className="fb-form_title">
                                        <h2>
                                            <div>Need a builder?</div>
                                            <div>Tell us about your job</div>
                                        </h2>
                                        <span>Step 1 of 3</span>
                                    </div>
                                    <div className="fb-form_row">
                                        <div className="fb-form_block">
                                            <div className="target-block">
                                                <input className="fb-form_control localarea_widget limit_required  ui-autocomplete-input" limit="255" type="text" name="paj[localarea]" placeholder="Postcode of your job" id="paj_localarea" autoComplete="off" role="textbox" aria-autocomplete="list" aria-haspopup="true"/> 
                                                <a href="#" className="tooltip lnk_pick_geo" title="use my current location" data-tooltip="use my current location">
                                                    <img src="/../img/icons/target.png" alt=""/>
                                                </a>
                                                <div className="non_display">
                                                    <a href="/findJob/PickAddressNew" className="btn-new btn-new_small btn-primary lnk_pick_addr" id="lnk_pick_addr"></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="fb-form_block">
                                            <input className="fb-form_control limit_required specialist_widget ui-autocomplete-input" limit="255" type="text" name="paj[specialist]" placeholder="Select a specialist" id="paj_specialist" autoComplete="off" role="textbox" aria-autocomplete="list" aria-haspopup="true"/>  
                                        </div>
                                        <div className="fb-form_block btn-block">
                                            <button className="btn-new btn-blue" type="submit">
                                                <span>Next step</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </section>

            // <div className="h-[15rem] bg-blue-400 mt-2 px-[30rem] py-[2rem]">
            //     <div className="flex justify-between">
            //         <h1>Need a builder? Tell us about your job</h1>
            //         <h3>Step 1 of 3</h3>
            //     </div>
            //     <div className="flex">
            //         <input type="text" className="mr-2 rounded" />
            //         <input type="text" className="mr-2 rounded" />
            //         <button>NEXT STEP</button>
            //     </div>
            // </div>

    )
}

export default Search;