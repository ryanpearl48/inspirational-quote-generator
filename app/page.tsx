"use client"
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

// Components
import { BackgroundImage1, BackgroundImage2, FooterLink, FootCon, GradientBackgroundCon, QuoteGeneratorCon, QuoteGeneratorInnerCon, QuoteGeneratorTitle, QuoteGeneratorSubTitle, GenerateQuoteButton, GenerateQuoteButtonText } from "@/components/QuoteGenerator/QuoteGeneratorElements"

// Assets
import Cloud1 from '@/assets/cloud.png'
import Cloud2 from '../assets/Sun-And-Cloud-PNG-Picture.png'

import { Amplify } from 'aws-amplify';
import aweExports from '../src/aws-exports'

Amplify.configure({ ...aweExports, ssr: true })

export default function Page() {

  const [numberOfQuotes, setNumberOfQuotes] = useState<Number | null>(0)

  return (
    <div>
      <GradientBackgroundCon>
        {/* Quote Generator Modal */}
        {/* <QuoteGeneratorModal /> */}

        {/* Quote Generator */}
        <QuoteGeneratorCon>
          <QuoteGeneratorInnerCon>
            <QuoteGeneratorTitle>
              Daily Inspiration Generator
            </QuoteGeneratorTitle>
            <QuoteGeneratorSubTitle>
              Looking for a splash of inspiration? Generate a quote card with a random inspirational quote provided by <FooterLink href="https://zenquotes.io/" target="_blank" rel="noopener noreferrer">
                ZenQuotes API
              </FooterLink>
            </QuoteGeneratorSubTitle>
            <GenerateQuoteButton>
              <GenerateQuoteButtonText onClick={null}>
                Make a Quote
              </GenerateQuoteButtonText>
            </GenerateQuoteButton>
          </QuoteGeneratorInnerCon>
        </QuoteGeneratorCon>



        {/* BG Images */}
        <BackgroundImage1
        src={Cloud1}
        height="300"
        alt="Cloudy background"
        priority
        />

        <BackgroundImage2
        src={Cloud2}
        height="300"
        alt="Cloudy background"
        priority
        />


        {/* Footer */}
        <FootCon>
          <>
            Quotes Generated: {numberOfQuotes}
            <br/>
            Developed by <FooterLink target="_blank" rel="noopener noreferrer" href="https://www.github.com/ryanpearl48">
              Ryan Pearl
            </FooterLink>
          </>
        </FootCon>

      </GradientBackgroundCon>
    </div>
  )
};
