import CheckItem from "../components/CheckItem";
import IconLink from "../components/IconLink";
import { ChevronUp } from 'lucide-react';
import { ChevronDown } from 'lucide-react';

export default function PerfectionTracker() {

    return (
        <main>
            <h1>Perfection Tracker</h1>
            <div className="info-cards-container">

                <section id="items-shipped" className="card">
                    <div className="flex justify-between">
                        <label className="check-container">
                            <input 
                                type="checkbox" 
                                id={"shipped-collection-checkbox"} 
                                name={"shipped-collection"} 
                                value={"shipped-collection"} 
                                /*checked={"isChecked"} 
                                onChange={handleOnChange}*/ />
                            Ship each item in the 'Items Shipped' collection.
                        </label>
                        <ChevronDown className="inline"/>
                    </div>
                </section>

                
                <section id="obelisks-built" className="card">
                    <div className="flex justify-between">
                        <label className="check-container">
                            <input 
                                type="checkbox" 
                                id={"shipped-collection-checkbox"} 
                                name={"shipped-collection"} 
                                value={"Shipped Collection"} 
                                /*checked={"isChecked"} 
                                onChange={handleOnChange}*/ />
                            Build the Earth, Water, Desert, and Island Obelisks.
                        </label>
                        <ChevronUp className="inline"/>
                    </div>

                    <div className="subcards-container flex flex-row basis-lg">
                        <article id="earth-obelisk-card" className="card">
                            <label className="check-container bottom-border">
                                <input 
                                    type="checkbox" 
                                    id={"earth-obelisk-checkbox"} 
                                    name={"earth-obelisk"} 
                                    value={"Earth Obelisk"} 
                                    /*checked={"isChecked"} 
                                    onChange={handleOnChange}*/ />
                                    Earth Obelisk
                            </label>
                            <div className="pt-3">
                                <IconLink label="500,000g" altImgSrc="Gold" isLink={false}/>
                                <IconLink section="Resource" label="Iridium Bar" qty={10}/>
                                <IconLink section="Mineral" label="10 Earth Crystal" altImgSrc="Earth Crystal"/>
                            </div>
                        </article>

                        <article id="water-obelisk-card" className="card">
                            <label className="check-container bottom-border">
                                <input 
                                    type="checkbox" 
                                    id={"water-obelisk-checkbox"} 
                                    name={"water-obelisk"} 
                                    value={"Water Obelisk"} 
                                    /*checked={"isChecked"} 
                                    onChange={handleOnChange}*/ />
                                    Water Obelisk
                            </label>
                            <div className="pt-3">
                                <IconLink label="500,000g" altImgSrc="Gold" isLink={false}/>
                                <IconLink section="Resource" label="5 Iridium Bar" altImgSrc="Iridium Bar"/>
                                <IconLink section="Mineral" label="10 Earth Crystal" altImgSrc="Earth Crystal"/>
                            </div>
                        </article>


                    </div>

                </section>


            </div>
        </main>
    );
        
}