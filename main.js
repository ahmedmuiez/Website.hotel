document.addEventListener('alpine:init', () => {
    Alpine.data('_app', () => ({

        coupons: [
            'Promo123',
        ],

        past_bookings: [],

        favorites: [],

        loyality_points: 0,

        tab: 1,

        booking: {
            checkin: null,
            checkout: null,
            room_cost: 0,
            number_of_rooms: 0,
            number_of_adults: 0,
            number_of_children: 0,
            extra_bed: 0,
            promo_code: null,

            // adventure
            adventure: {
                number_of_adults_local: 0,
                number_of_adults_foreign: 0,
                number_of_children_local: 0,
                number_of_children_foreign: 0,
                adult_guide: 0,
                child_guide: 0
            },

            customer: {
                name: null,
                email: null,
                phone: null,
                address: null,
                city: null,
                country: null,
                postal_code: null,

                // card details
                card_number: null,
                card_holder: null,
                expiry_date: null,
            },

            // final calculations
            total_cost: 0,
            discount_percentage: 0,
            total_discount: 0,
            final_total: 0,
            final_adventure_cost: 0
        },

        get total_adventure_cost() {
            let total = 0;
            total += this.booking.adventure.number_of_adults_local * 5000;
            total += this.booking.adventure.number_of_adults_foreign * 10000;
            total += this.booking.adventure.number_of_children_local * 2000;
            total += this.booking.adventure.number_of_children_foreign * 5000;
            total += this.booking.adventure.adult_guide * 1000;
            total += this.booking.adventure.child_guide * 500;
            this.booking.final_adventure_cost = total;
            return total;
        },

        get total_cost() {
            let total = 0;
            total += this.booking.room_cost * this.booking.number_of_rooms;
            total += this.total_adventure_cost;
            this.booking.total_cost = total;

            // calculate discount
            this.booking.total_discount = total * (this.booking.discount_percentage / 100);

            // calculate final total
            this.booking.final_total = total - this.booking.total_discount;

            return total;
        },

        goToCheckout() {
            this.tab = 2;

            localStorage.setItem('booking', JSON.stringify(this.booking));
        },

        completeBooking() {

            this.tab = 4;

            if (this.booking.number_of_rooms > 3) {
                this.loyality_points += 20;
            }

            localStorage.setItem('loyality_points', this.loyality_points);

            this.past_bookings.push(this.booking);

            localStorage.setItem('past_bookings', JSON.stringify(this.past_bookings));

            // clear the booking
            this.booking = {
                checkin: null,
                checkout: null,
                room_cost: 0,
                number_of_rooms: 0,
                number_of_adults: 0,
                number_of_children: 0,
                extra_bed: 0,
                promo_code: null,

                // adventure
                adventure: {
                    number_of_adults_local: 0,
                    number_of_adults_foreign: 0,
                    number_of_children_local: 0,
                    number_of_children_foreign: 0,
                    adult_guide: 0,
                    child_guide: 0
                },

                customer: {
                    name: null,
                    email: null,
                    phone: null,
                    address: null,
                    city: null,
                    country: null,
                    postal_code: null,

                    // card details
                    card_number: null,
                    card_holder: null,
                    expiry_date: null,
                },

                // final calculations
                total_cost: 0,
                discount_percentage: 0,
                total_discount: 0,
                final_total: 0,
                final_adventure_cost: 0
            };

            localStorage.removeItem('booking');
        },

        bookFavorite(index) {
            localStorage.removeItem('booking');

            this.booking = this.favorites[index];

            this.tab = 1;
        },

        addToFavorites() {
            this.tab = 3;

            this.favorites.push(this.booking);

            localStorage.setItem('favorites', JSON.stringify(this.favorites));

            this.booking = {
                checkin: null,
                checkout: null,
                room_cost: 0,
                number_of_rooms: 0,
                number_of_adults: 0,
                number_of_children: 0,
                extra_bed: 0,
                promo_code: null,

                // adventure
                adventure: {
                    number_of_adults_local: 0,
                    number_of_adults_foreign: 0,
                    number_of_children_local: 0,
                    number_of_children_foreign: 0,
                    adult_guide: 0,
                    child_guide: 0
                },

                customer: {
                    name: null,
                    email: null,
                    phone: null,
                    address: null,
                    city: null,
                    country: null,
                    postal_code: null,

                    // card details
                    card_number: null,
                    card_holder: null,
                    expiry_date: null,
                },

                // final calculations
                total_cost: 0,
                discount_percentage: 0,
                total_discount: 0,
                final_total: 0,
                final_adventure_cost: 0
            };

            localStorage.removeItem('booking');
        },

        checkLoyaltyPoints() {

        },

        init() {
            this.booking.checkin = new Date().toISOString().slice(0, 10);

            let tomorrow = new Date();

            this.$watch('booking.promo_code', (value) => {
                if (this.coupons.includes(value)) {
                    // alert('Coupon Applied');
                    this.booking.discount_percentage = 10;
                } else {
                    this.booking.discount_percentage = 0;
                }
            });

            if (localStorage.getItem('booking')) {
                this.booking = JSON.parse(localStorage.getItem('booking'));
            }

            if (localStorage.getItem('past_bookings')) {
                this.past_bookings = JSON.parse(localStorage.getItem('past_bookings'));
            }

            if (localStorage.getItem('favorites')) {
                this.favorites = JSON.parse(localStorage.getItem('favorites'));
            }

            if (localStorage.getItem('loyality_points')) {
                this.loyality_points = parseInt(localStorage.getItem('loyality_points'));
            }

        }

    }));
})