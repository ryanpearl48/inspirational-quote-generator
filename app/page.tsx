"use client"
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

// Components
import { BackgroundImage1, BackgroundImage2, FooterLink, FootCon, GradientBackgroundCon, QuoteGeneratorCon, QuoteGeneratorInnerCon, QuoteGeneratorTitle, QuoteGeneratorSubTitle, GenerateQuoteButton, GenerateQuoteButtonText } from "@/components/QuoteGenerator/QuoteGeneratorElements"

// Assets
import Cloud1 from '@/assets/cloud.png'
import Cloud2 from '../assets/Sun-And-Cloud-PNG-Picture.png'

import { API, Amplify } from 'aws-amplify';
import awsExports from '../src/aws-exports'
import { quotesQueryName } from "@/src/graphql/queries";
import { GraphQLResult } from '@aws-amplify/api-graphql'
Amplify.configure({ ...awsExports, ssr: true })

// Interface for our DynamoDB object
interface UpdateQuoteInfoData {
  id: string;
  queryName: string;
  quotesGenerated: number;
  createdAt: string;
  updatedAt: string;
}

// type guard for our fetch function

function isGraphQLResultForquotesQueryName(response: any): response is GraphQLResult<{
  quotesQueryName: {
    items: [UpdateQuoteInfoData];
  }
}> {
  return response.data && response.data.quotesQueryName && response.data.quotesQueryName.items;
}


export default function Page() {

  const [numberOfQuotes, setNumberOfQuotes] = useState<Number | null>(0)

  // Function to fetch our DynamoDB Object
  const updateQuoteInfo = async () => {
    try {
      const response = await API.graphql<UpdateQuoteInfoData>({
        query: quotesQueryName,
        authMode: "AWS_IAM",
        variables: {
          queryName: "LIVE",
        },
      })

      if (!isGraphQLResultForquotesQueryName(response)) {
        throw new Error('Unexpected response from API.graphql');
      }

      if(!response.data) {
        throw new Error('Response data is undefined');
      }

      const receivedNumberOfQuotes = response.data.quotesQueryName.items[0].quotesGenerated;
      setNumberOfQuotes(receivedNumberOfQuotes)
    } catch (error) {
      console.error("error getting quote data", error)
    }
  }

  useEffect(() => {
    updateQuoteInfo();
  }, [])

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
