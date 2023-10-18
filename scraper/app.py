import json
# import requests
import httpx
from bs4 import BeautifulSoup


def scrape_page(url):

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    }

    # Send a GET request to the URL
    response = httpx.get(url, headers=headers, follow_redirects=True)
    response.raise_for_status()
    print(response.status_code)

    # Parse the HTML using BeautifulSoup
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find all div elements with the specified class
    div_elements = soup.find_all('div', class_='col')
    div_category = soup.find_all('div', class_='ebayui-spoke-subtitle')

    # Extract category
    def get_category():
        for span in div_category:
            category = span.find('span').text.strip()
            return category

    # Initialize an empty list to store the extracted data
    data_list = []

    # Loop through each div element and extract information
    for div_element in div_elements:
        # Extract img-link
        img_element = div_element.find('img')
        img_link = img_element['src'] if img_element else ''

        # Extract title
        title_element = div_element.find('span', class_='ebayui-ellipsis-2')
        title = title_element.text.strip() if title_element else ''

        # Extract rating
        # rating_element = div_element.find('span', class_='a-icon-alt')
        # rating = rating_element.text.strip() if rating_element else ''

        # Extract price
        price_element = div_element.find('span', class_='first')
        price = price_element.text.strip() if price_element else ''

        # Extract category
        def get_category():
            for span in div_category:
                category = span.find('span').text.strip()
                return category

        # Create a dictionary with the extracted data
        item_data = {
            'img_link': img_link,
            'title': title,
            'price': price,
            'category': get_category() 
        }

        # Add the dictionary to the data_list
        data_list.append(item_data)

    return data_list


def main():
    # Base URL of the search results
    # https://www.amazon.com/s?i=electronics-intl-ship&rh=n%3A16225009011&fs=true&page=2&qid=1697313374&ref=sr_pg_2
    # base_url = 'https://www.amazon.com/s?i=electronics-intl-ship&rh=n%3A16225009011&fs=true&page=2&qid=1697313374&ref=sr_pg_2'
    # https://www.ebay.com/globaldeals/tech/laptops-netbooks
    # Number of pages to scrape
    # num_pages = 5

    # Initialize an empty list to store data from all pages
    all_data = []
    lists_of_url = [
        'laptops-netbooks',
        'cell-phones',
        'cameras-photo',
        'tv-video-home-audio',
        'ipads-tablets-ereaders',
        'phone-cases-accessories',
        'vehicle-electronics-gps',
        'memory-drives-storage',
        'printers-printer-supplies',
        'headphones-portable-audio',
    ]

    # Loop through each page
    for url in lists_of_url:
        # Construct the URL for the current page
        current_url = f'https://www.ebay.com/globaldeals/tech/{url}'

        # Scrape the current page and append the data to the list
        page_data = scrape_page(current_url)
        all_data.extend(page_data)

    # Write the extracted data to data.json
    with open('data4.json', 'w', encoding='utf-8') as json_file:
        json.dump(all_data, json_file, ensure_ascii=False, indent=2)

    print('Extraction and writing to data.json completed.')


if __name__ == '__main__':
    main()
